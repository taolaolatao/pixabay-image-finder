import React from 'react'
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import { GridList, GridTile } from 'material-ui/GridList';

class ImageResults extends React.PureComponent {
	state = {
		open: false,
		currentImg: ''
	}

	handleOpen = img => this.setState({ open: true, currentImg: img })

	handleClose = () => this.setState({ open: false })

	render() {
		const { images } = this.props;

		const actions = [
			<FlatButton label="Close" primary={true} onClick={this.handleClose} />
		]
		
		return (
			<div>
				<GridList cols={3}>
					{images.map(img => (
						<GridTile
							key={img.id}
							title={img.tags}
							subtitle={
								<span>
									by <b>{img.user}</b>
								</span>
							}
							actionIcon={
								<IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
									<ZoomIn color="white" />
								</IconButton>
							}
						>
							<img src={img.largeImageURL} alt="Result Pixabay" />
						</GridTile>
					))}
				</GridList>
				<Dialog 
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<img src={this.state.currentImg} style={{ width: "100%" }} alt="" />
				</Dialog>
			</div>
		)
	}
}

ImageResults.propTypes = {
	images: PropTypes.array.isRequired
};

export default ImageResults;
