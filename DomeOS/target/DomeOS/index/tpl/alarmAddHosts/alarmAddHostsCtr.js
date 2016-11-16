'use strict';

/*
 * @author ChandraLee
 */

(function (domeApp, undefined) {
	'use strict';

	if (typeof domeApp === 'undefined') return;

	domeApp.controller('AlarmAddHostsCtr', AlarmAddHostCtr);

	function AlarmAddHostCtr($scope, $domeCluster, $domeAlarm, $state, $domePublic) {
		'use strict';

		var vm = this;
		var id = +$state.params.id,
		    hostGroupName = $state.params.name,
		    hostGroupService = $domeAlarm.getInstance('HostGroupService'),
		    nodeService = $domeCluster.getInstance('NodeService');
		if (!id || !hostGroupName) {
			$state.go('alarm.hostgroups');
			return;
		}
		$scope.$emit('pageTitle', {
			title: '添加主机—' + hostGroupName,
			descrition: '在这里您可以将主机添加到主机组中。',
			mod: 'monitor'
		});
		var hostGroupHostList = [];
		vm.cluster = {};
		vm.variable = {
			nodeKey: '',
			selectedNodeKey: ''
		};
		vm.toggleCluster = function (clusterId, clusterName) {
			vm.cluster.id = clusterId;
			vm.cluster.name = clusterName;
			nodeService.getNodeList(clusterId).then(function (res) {
				vm.nodeListIns.init(res.data.result, clusterName);
			}, function () {
				vm.nodeListIns.init([], clusterName);
			});
		};
		vm.cancelModify = function () {
			vm.nodeListIns.initSelectedList(hostGroupHostList);
		};
		vm.saveModify = function () {
			var selectedList = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = vm.nodeListIns.selectedList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var selectedNode = _step.value;

					selectedList.push({
						hostname: selectedNode.name,
						ip: selectedNode.ip,
						id: selectedNode.id,
						cluster: selectedNode.cluster
					});
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			hostGroupService.addHost(id, selectedList).then(function () {
				$domePublic.openPrompt('添加成功！');
				$state.go('alarm.hostgroups');
			}, function (res) {
				$domePublic.openWarning({
					title: '添加失败！',
					msg: 'Message:' + res.data.resultMsg
				});
			});
		};
		nodeService.getData().then(function (res) {
			vm.clusterList = res.data.result || [];
			vm.nodeListIns = $domeAlarm.getInstance('NodeList');
			if (vm.clusterList[0]) {
				vm.toggleCluster(vm.clusterList[0].id, vm.clusterList[0].name);
			}
		});
	}
	AlarmAddHostCtr.$inject = ['$scope', '$domeCluster', '$domeAlarm', '$state', '$domePublic'];
})(window.domeApp);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4L3RwbC9hbGFybUFkZEhvc3RzL2FsYXJtQWRkSG9zdHNDdHIuZXMiXSwibmFtZXMiOlsiZG9tZUFwcCIsInVuZGVmaW5lZCIsImNvbnRyb2xsZXIiLCJBbGFybUFkZEhvc3RDdHIiLCIkc2NvcGUiLCIkZG9tZUNsdXN0ZXIiLCIkZG9tZUFsYXJtIiwiJHN0YXRlIiwiJGRvbWVQdWJsaWMiLCJ2bSIsImlkIiwicGFyYW1zIiwiaG9zdEdyb3VwTmFtZSIsIm5hbWUiLCJob3N0R3JvdXBTZXJ2aWNlIiwiZ2V0SW5zdGFuY2UiLCJub2RlU2VydmljZSIsImdvIiwiJGVtaXQiLCJ0aXRsZSIsImRlc2NyaXRpb24iLCJtb2QiLCJob3N0R3JvdXBIb3N0TGlzdCIsImNsdXN0ZXIiLCJ2YXJpYWJsZSIsIm5vZGVLZXkiLCJzZWxlY3RlZE5vZGVLZXkiLCJ0b2dnbGVDbHVzdGVyIiwiY2x1c3RlcklkIiwiY2x1c3Rlck5hbWUiLCJnZXROb2RlTGlzdCIsInRoZW4iLCJyZXMiLCJub2RlTGlzdElucyIsImluaXQiLCJkYXRhIiwicmVzdWx0IiwiY2FuY2VsTW9kaWZ5IiwiaW5pdFNlbGVjdGVkTGlzdCIsInNhdmVNb2RpZnkiLCJzZWxlY3RlZExpc3QiLCJzZWxlY3RlZE5vZGUiLCJwdXNoIiwiaG9zdG5hbWUiLCJpcCIsImFkZEhvc3QiLCJvcGVuUHJvbXB0Iiwib3Blbldhcm5pbmciLCJtc2ciLCJyZXN1bHRNc2ciLCJnZXREYXRhIiwiY2x1c3Rlckxpc3QiLCIkaW5qZWN0Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBSUEsQ0FBQyxVQUFVQSxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjtBQUM5Qjs7QUFDQSxLQUFJLE9BQU9ELE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7O0FBRXBDQSxTQUFRRSxVQUFSLENBQW1CLGtCQUFuQixFQUF1Q0MsZUFBdkM7O0FBRUEsVUFBU0EsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUNDLFlBQWpDLEVBQStDQyxV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QixDQUFqQjtBQUNBLE9BQUlOLEdBQUcwQyxXQUFILENBQWUsQ0FBZixDQUFKLEVBQXVCO0FBQ3RCMUMsT0FBR2tCLGFBQUgsQ0FBaUJsQixHQUFHMEMsV0FBSCxDQUFlLENBQWYsRUFBa0J6QyxFQUFuQyxFQUF1Q0QsR0FBRzBDLFdBQUgsQ0FBZSxDQUFmLEVBQWtCdEMsSUFBekQ7QUFDQTtBQUNELEdBTkQ7QUFPQTtBQUNEVixpQkFBZ0JpRCxPQUFoQixHQUEwQixDQUFDLFFBQUQsRUFBVyxjQUFYLEVBQTJCLFlBQTNCLEVBQXlDLFFBQXpDLEVBQW1ELGFBQW5ELENBQTFCO0FBQ0EsQ0FyRUQsRUFxRUdDLE9BQU9yRCxPQXJFViIsImZpbGUiOiJpbmRleC90cGwvYWxhcm1BZGRIb3N0cy9hbGFybUFkZEhvc3RzQ3RyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQGF1dGhvciBDaGFuZHJhTGVlXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uIChkb21lQXBwLCB1bmRlZmluZWQpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0aWYgKHR5cGVvZiBkb21lQXBwID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG5cclxuXHRkb21lQXBwLmNvbnRyb2xsZXIoJ0FsYXJtQWRkSG9zdHNDdHInLCBBbGFybUFkZEhvc3RDdHIpO1xyXG5cclxuXHRmdW5jdGlvbiBBbGFybUFkZEhvc3RDdHIoJHNjb3BlLCAkZG9tZUNsdXN0ZXIsICRkb21lQWxhcm0sICRzdGF0ZSwgJGRvbWVQdWJsaWMpIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdGxldCB2bSA9IHRoaXM7XHJcblx0XHRjb25zdCBpZCA9ICskc3RhdGUucGFyYW1zLmlkLFxyXG5cdFx0XHRob3N0R3JvdXBOYW1lID0gJHN0YXRlLnBhcmFtcy5uYW1lLFxyXG5cdFx0XHRob3N0R3JvdXBTZXJ2aWNlID0gJGRvbWVBbGFybS5nZXRJbnN0YW5jZSgnSG9zdEdyb3VwU2VydmljZScpLFxyXG5cdFx0XHRub2RlU2VydmljZSA9ICRkb21lQ2x1c3Rlci5nZXRJbnN0YW5jZSgnTm9kZVNlcnZpY2UnKTtcclxuXHRcdGlmICghaWQgfHwgIWhvc3RHcm91cE5hbWUpIHtcclxuXHRcdFx0JHN0YXRlLmdvKCdhbGFybS5ob3N0Z3JvdXBzJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdCRzY29wZS4kZW1pdCgncGFnZVRpdGxlJywge1xyXG5cdFx0XHR0aXRsZTogJ+a3u+WKoOS4u+acuuKAlCcgKyBob3N0R3JvdXBOYW1lLFxyXG5cdFx0XHRkZXNjcml0aW9uOiAn5Zyo6L+Z6YeM5oKo5Y+v5Lul5bCG5Li75py65re75Yqg5Yiw5Li75py657uE5Lit44CCJyxcclxuXHRcdFx0bW9kOiAnbW9uaXRvcidcclxuXHRcdH0pO1xyXG5cdFx0bGV0IGhvc3RHcm91cEhvc3RMaXN0ID0gW107XHJcblx0XHR2bS5jbHVzdGVyID0ge307XHJcblx0XHR2bS52YXJpYWJsZSA9IHtcclxuXHRcdFx0bm9kZUtleTogJycsXHJcblx0XHRcdHNlbGVjdGVkTm9kZUtleTogJydcclxuXHRcdH07XHJcblx0XHR2bS50b2dnbGVDbHVzdGVyID0gZnVuY3Rpb24gKGNsdXN0ZXJJZCwgY2x1c3Rlck5hbWUpIHtcclxuXHRcdFx0dm0uY2x1c3Rlci5pZCA9IGNsdXN0ZXJJZDtcclxuXHRcdFx0dm0uY2x1c3Rlci5uYW1lID0gY2x1c3Rlck5hbWU7XHJcblx0XHRcdG5vZGVTZXJ2aWNlLmdldE5vZGVMaXN0KGNsdXN0ZXJJZCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdFx0dm0ubm9kZUxpc3RJbnMuaW5pdChyZXMuZGF0YS5yZXN1bHQsIGNsdXN0ZXJOYW1lKTtcclxuXHRcdFx0fSwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZtLm5vZGVMaXN0SW5zLmluaXQoW10sIGNsdXN0ZXJOYW1lKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdFx0dm0uY2FuY2VsTW9kaWZ5ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2bS5ub2RlTGlzdElucy5pbml0U2VsZWN0ZWRMaXN0KGhvc3RHcm91cEhvc3RMaXN0KTtcclxuXHRcdH07XHJcblx0XHR2bS5zYXZlTW9kaWZ5ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWRMaXN0ID0gW107XHJcblx0XHRcdGZvciAobGV0IHNlbGVjdGVkTm9kZSBvZiB2bS5ub2RlTGlzdElucy5zZWxlY3RlZExpc3QpIHtcclxuXHRcdFx0XHRzZWxlY3RlZExpc3QucHVzaCh7XHJcblx0XHRcdFx0XHRob3N0bmFtZTogc2VsZWN0ZWROb2RlLm5hbWUsXHJcblx0XHRcdFx0XHRpcDogc2VsZWN0ZWROb2RlLmlwLFxyXG5cdFx0XHRcdFx0aWQ6IHNlbGVjdGVkTm9kZS5pZCxcclxuXHRcdFx0XHRcdGNsdXN0ZXI6IHNlbGVjdGVkTm9kZS5jbHVzdGVyXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aG9zdEdyb3VwU2VydmljZS5hZGRIb3N0KGlkLCBzZWxlY3RlZExpc3QpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCRkb21lUHVibGljLm9wZW5Qcm9tcHQoJ+a3u+WKoOaIkOWKn++8gScpO1xyXG5cdFx0XHRcdCRzdGF0ZS5nbygnYWxhcm0uaG9zdGdyb3VwcycpO1xyXG5cdFx0XHR9LCBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdFx0JGRvbWVQdWJsaWMub3Blbldhcm5pbmcoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICfmt7vliqDlpLHotKXvvIEnLFxyXG5cdFx0XHRcdFx0bXNnOiAnTWVzc2FnZTonICsgcmVzLmRhdGEucmVzdWx0TXNnXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdG5vZGVTZXJ2aWNlLmdldERhdGEoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0dm0uY2x1c3Rlckxpc3QgPSByZXMuZGF0YS5yZXN1bHQgfHwgW107XHJcblx0XHRcdHZtLm5vZGVMaXN0SW5zID0gJGRvbWVBbGFybS5nZXRJbnN0YW5jZSgnTm9kZUxpc3QnKTtcclxuXHRcdFx0aWYgKHZtLmNsdXN0ZXJMaXN0WzBdKSB7XHJcblx0XHRcdFx0dm0udG9nZ2xlQ2x1c3Rlcih2bS5jbHVzdGVyTGlzdFswXS5pZCwgdm0uY2x1c3Rlckxpc3RbMF0ubmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRBbGFybUFkZEhvc3RDdHIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRkb21lQ2x1c3RlcicsICckZG9tZUFsYXJtJywgJyRzdGF0ZScsICckZG9tZVB1YmxpYyddO1xyXG59KSh3aW5kb3cuZG9tZUFwcCk7Il19
