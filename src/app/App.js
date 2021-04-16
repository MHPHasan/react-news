import React, { Component, createRef } from "react";
import "./App.css";
import Header from "../components/Header";
import News, { newsCategory } from "../news";
import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";
import AboutResult from "../components/AboutResult";
import Loading from "../components/Loading";

const news = new News("technology");

class App extends Component {
	state = {
		data: {},
		isLoading: true,
	};

	searchRef = createRef();
	itemListRef = []

	componentDidMount() {
		news
			.getNews()
			.then((res) => {
				this.setState({
					data: res,
					isLoading: false,
				});
				// console.log(res);
			})
			.catch((e) => {
				console.log(e);
				this.setState({ isLoading: false });
			});

			//Focus Header Input
			this.searchRef.current.focus();
			// console.log(this.itemListRef);
				
	}

	goToTop = () => {
		window.scroll(0, 0);
	}

	next = () => {
		if (this.state.data.isNext) {
			this.setState({
				isLoading: true,
			});
		}

		news.next()
			.then(res => {
				this.setState({
					data: res,
					isLoading: false
				})
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isLoading: false,
				});
			})
	};

	prev = () => {
		if (this.state.data.isPrev) {
			this.setState({
				isLoading: true,
			});
		}

		news.prev()
			.then(res => {
				this.setState({
					data: res,
					isLoading: false
				})
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isLoading: false,
				});
			})
	};

	handlePageChange = (value) => {
		this.setState({
			data: {
				...this.state.data,
				currentPage: Number.parseInt(value)
			}
		})
	}

	goToPage = () => {
		this.setState({
			isLoading: true
		});

		news.setcurrentPage(this.state.data.currentPage)
			.then(res => {
				this.setState({
					data: res,
					isLoading: false
				})
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isLoading: false,
				});
			})
		}

	changeCategory = category => {
		this.setState({
			isLoading: true,
		});
		news.changeCategory(category)
			.then(res => {
				this.setState({
					data: res,
					isLoading: false
				})
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isLoading: false,
				});
			})
	}

	search = searchStr => {
		this.setState({
			isLoading: true,
		});
		news.search(searchStr)
			.then(res => {
				this.setState({
					data: res,
					isLoading: false
				})
			})
			.catch(e => {
				console.log(e);
				this.setState({
					isLoading: false,
				});
			})
	}

	render() {

		const { isPrev, isNext, category, totalResults, currentPage, totalPage } = this.state.data

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6 offset-md-3">
						<Header category={category} changeCategory={this.changeCategory} search={this.search} ref={this.searchRef} />
						<AboutResult totalPage={totalPage} currentPage={currentPage} totalResults={totalResults} />
						{this.state.isLoading ? (
							<Loading />
						) : (
							<div>
								<NewsList news={this.state.data.articles} ref={this.itemListRef} />
								<Pagination next={this.next} prev={this.prev} isPrev={isPrev} isNext={isNext} totalPage={totalPage} currentPage={currentPage} handlePageChange={this.handlePageChange} goToPage={this.goToPage} />
								<button className="float-end my-5" onClick={this.goToTop}>Go To Top</button>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
