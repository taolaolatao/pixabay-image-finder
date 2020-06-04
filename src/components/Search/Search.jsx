import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ImageResults from '../ImageResults/ImageResults';
import { api } from '../../api';

class Search extends React.Component {
	state = {
		keyword: '',
		amount: 10,
		images: []
	}

	onChangeKeyWord = e => {
		this.setState({ [e.target.name]: e.target.value }, async () => {
			const { keyword, amount } = this.state;

			try {
				const results = await api.get('/', { 
					params: { 
						q: keyword, 
						per_page: amount,
						image_type: 'photo', 
						key: '16881353-7698db3408afc2db4d639fb05'
					} 
				});
	
				this.setState({ images: results.data.hits })
			} catch (error) {
				console.error(error);
			}
		})
	}

	onChangeAmount = (_, index, value) => {
		this.setState({ amount: value });
	}

	render() {
		const { keyword, amount, images } = this.state
		return (
			<div>
				<TextField 
					name="keyword"
					value={keyword}
					fullWidth={true}
					floatingLabelText="Search For Images"
					onChange={this.onChangeKeyWord}
				/>
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
			</div>
		);
	}
}

export default Search;
