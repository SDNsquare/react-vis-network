import Module from './Module';

export default class ClusterByConnection extends Module {
  updateCluster = () => {
    const {
      id,
      rootNodeId,
      vis: { network }
    } = this.props;

    // Initial load, skip
    if (!network) {
      return;
    }

    const config = this.getModuleOptions();

    if (network.findNode(id).length > 0) {
      network.clustering.updateClusteredNode(id, config);
    } else {
      network.clusterByConnection(rootNodeId, {
        clusterNodeProperties: config
      });
    }
  };

  componentDidMount() {
    super.componentDidMount();

    this.updateCluster();
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    this.updateCluster();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    const {
      id,
      vis: { network }
    } = this.props;

    network.openCluster(id);
  }
}
