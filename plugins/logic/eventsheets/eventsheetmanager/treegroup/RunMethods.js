import { RUNNING, IDLE, SUCCESS } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

export default {
    start() {
        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        var treeManager = this.parent;
        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = treeManager.blackboard;
        var commandExecutor = treeManager.commandExecutor;

        pendingTrees.length = 0;

        // Run parallel tree, will return running, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            tree.resetState(blackboard);
            if (tree.isParallel) {
                // Start ticking
                var status = tree.tick(blackboard, commandExecutor);
                // Break after condition eval, run this tree at next tick
                if (status === RUNNING) {
                    pendingTrees.push(tree);
                }
            } else {
                pendingTrees.push(tree);
            }
        }

        this.continue();

        return this;
    },

    continue() {
        if (!this.isRunning) {
            return this;
        }

        var treeManager = this.parent;
        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = treeManager.blackboard;
        var commandExecutor = treeManager.commandExecutor;

        blackboard.treeGroup = this;  // For TaskAction
        closedTrees.length = 0;

        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var status = blackboard.getTreeState(tree.id);

            if (status === IDLE) {
                // Break after condition eval, run this tree at next tick
                status = tree.tick(blackboard, commandExecutor);

                // status = RUNNING, because of `conditionEvalBreak:true` 

                if (tree.conditionEvalPassed) {
                    treeManager.emit('eventsheet.enter', tree.title, this.name, treeManager);
                } else {
                    treeManager.emit('eventsheet.catch', tree.title, this.name, treeManager);
                }

                if (!this.isRunning) {
                    // Can break here
                    break;
                }
            }

            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
            status = tree.tick(blackboard, commandExecutor);

            if (status === RUNNING) {
                break;
            } else {
                closedTrees.push(tree);
                if (tree.conditionEvalPassed) {
                    treeManager.emit('eventsheet.exit', tree.title, this.name, treeManager);
                }
            }

            if (!this.isRunning) {
                // Can break here
                break;
            }

        }

        blackboard.treeGroup = undefined;

        if (closedTrees.length > 0) {
            RemoveItem(trees, closedTrees);
        }

        if (trees.length === 0) {
            this.isRunning = false;
            treeManager.emit('complete', this.name, treeManager);
        }

        return this;
    },

    stop() {
        this.isRunning = false;

        var treeManager = this.parent;
        var blackboard = treeManager.blackboard;
        var commandExecutor = treeManager.commandExecutor;

        blackboard.treeGroup = this;  // For TaskAction

        this.pendingTrees.forEach(function (tree) {
            tree.abort(blackboard, commandExecutor);
        })
        this.pendingTrees.length = 0;

        return this;
    },

    startTree(title, ignoreCondition = true) {
        if (this.isRunning) {
            return this;
        }

        var tree = this.getTree(title);
        if (!tree) {
            return this;
        }

        this.isRunning = true;

        var treeManager = this.parent;
        var pendingTrees = this.pendingTrees;
        var blackboard = treeManager.blackboard;
        var commandExecutor = treeManager.commandExecutor;

        pendingTrees.length = 0;

        tree.resetState(blackboard);

        tree.setConditionEnable(!ignoreCondition);

        // Start ticking
        var status = tree.tick(blackboard, commandExecutor);

        tree.setConditionEnable(true);

        if (status === RUNNING) {
            pendingTrees.push(tree);
        }

        this.continue();

        return this;
    }
}