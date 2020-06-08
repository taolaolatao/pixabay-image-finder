import React from 'react'
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import { GridList, GridTile } from 'material-ui/GridList';

class VideoResults extends React.PureComponent {
	state = {
		open: false,
		currentVideo: ''
	}

	handleOpen = video => this.setState({ open: true, currentVideo: video })
	handleClose = () => this.setState({ open: false })

	render() {
		const { videos } = this.props;

		const actions = [
			<FlatButton label="Close" primary={true} onClick={this.handleClose} />
		]
		
		return (
			<div>
				<GridList cols={3}>
					{videos.map(video => (
						<GridTile
							key={video.id}
							title={video.tags}
							subtitle={
								<span>
									by <b>{video.user}</b>
								</span>
							}
							actionIcon={
								<IconButton onClick={() => this.handleOpen(video.videos.medium.url)}>
									<ZoomIn color="white" />
								</IconButton>
							}
						>
							<a href={video.pageURL} target="__blank">
								<video width="400px" height="200px" autoPlay={false} src={video.videos.medium.url} style={{ textAlign: 'center' }} />
							</a>
						</GridTile>
					))}
				</GridList>
				<Dialog 
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<video width="100%" height="100%" autoPlay={true} controls src={this.state.currentVideo} />
				</Dialog>
			</div>
		)
	}
}

VideoResults.propTypes = {
	videos: PropTypes.array.isRequired
};

export default VideoResults;
