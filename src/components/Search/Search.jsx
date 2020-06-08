import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ImageResults from '../ImageResults/ImageResults';
import VideoResults from '../VideoResults/VideoResults';
import { api } from '../../api';

class Search extends React.Component {
	state = {
		keyword: '',
		selectType: 'image',
		amount: 10,
		images: [],
		videos: []
	}

	searchImage = async e => {
		if(e.which === 13){
			const { keyword, amount } = this.state;
			
			try {
				const results = await api.get('/', { 
					params: { 
						q: keyword, 
						per_page: amount,
						image_type: 'photo', 
						key: api.defaults.params.key
					} 
				});
	
				this.setState({ images: results.data.hits })
			} catch (error) {
				console.error(error);
			}
		}
	}

	searchVideo = async e => {
		if(e.which === 13){
			const { keyword, amount } = this.state;
			var url = new URL('https://pixabay.com/api/videos/');

			try {
				var params = {
					q: keyword, 
					per_page: amount, 
					video_type: 'all', // animation
					key: api.defaults.params.key
				}
				url.search = new URLSearchParams(params).toString();
				
				const results = await fetch(url);
				const response = await results.json();
				this.setState({ videos: response.hits });
			} catch (error) {
				console.error(error);
			}
		}
	}

	onChangeKeyWord = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeAmount = (_, index, value) => {
		this.setState({ amount: value });
	}

	onChangeSelectType = (_, index, value) => {
		this.setState({ videos: [], images: [] });
		this.setState({ keyword: '' });
		this.setState({ selectType: value });
	}

	render() {
		const { keyword, amount, images, videos, selectType } = this.state
		return (
			<div>
				{selectType === 'image' ? (
					<TextField 
						name="keyword"
						value={keyword}
						fullWidth={true}
						floatingLabelText="Search For Images"
						onChange={this.onChangeKeyWord}
						onKeyPress={this.searchImage}
					/>
				) : (
					<TextField 
						name="keyword"
						value={keyword}
						fullWidth={true}
						floatingLabelText="Search For Videos"
						onChange={this.onChangeKeyWord}
						onKeyPress={this.searchVideo}
					/>
				)}				
				<SelectField
					name="searchType"
					floatingLabelText="Search Type"
					value={selectType}
					onChange={this.onChangeSelectType}
				>
					<MenuItem value="image" primaryText="Image" />
					<MenuItem value="video" primaryText="Video" />
				</SelectField>
				<br />
				<SelectField
					name="amount"
					floatingLabelText="Amount"
					value={amount}
					onChange={this.onChangeAmount}
				>
					<MenuItem value={5} primaryText="5" />
					<MenuItem value={10} primaryText="10" />
					<MenuItem value={15} primaryText="15" />
					<MenuItem value={30} primaryText="30" />
					<MenuItem value={50} primaryText="50" />
				</SelectField>
				<br />
				{images.length ? <ImageResults images={images} /> : null}
				{videos.length ? <VideoResults videos={videos} /> : null}
			</div>
		);
	}
}

export default Search;
