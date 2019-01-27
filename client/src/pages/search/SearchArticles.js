import Moment from "react-moment";
import React, { Component } from "react";
import SaveButton from "../../components/SaveButton";
import Jumbotron from "../../components/Jumbotron";
import nytapi from "../../utils/nyt/nytapi";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class SearchArticles extends Component {
 
  state = {
    search: "",
    startYear: "",
    endYear: "",
    articles: [],
    savedArticles: [],
    title: "",
  };

 
 //When the user press the submit button
 
  searchArticle = (event) => {
    event.preventDefault();

    
    nytapi.getArticles(this.state.search)
      .then(res => {
        var bookrecovered=[];
        for (var i=0; i<10 || i<[res.data.items].length;i++){
                  console.log(res.data.items[i].volumeInfo.title);
                  
                  bookrecovered.push(res.data.items[i]);
        }
        
        console.log(bookrecovered);
        this.setState({articles: bookrecovered});
              console.log(this.state.articles);

      })
      .then(res => {
        if (this.state.articles.length > 0) {
          alert("📰 Articles found! 📰")
        } else {
          alert("😢 No articles found! Try another search! 😢")
        }
      })
      .catch(err => console.log(err));
  }

  deleteArticleFunction = (event) => {
    event.preventDefault();
    const deleteArticleButton = this.state.savedArticles.filter(element => element._id = event.target.id)[0];
    nytapi.deleteSavedArticle(deleteArticleButton)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  saveArticleFunction = event => {
    event.preventDefault();

    const articleSaveButtonContent = (this.state.articles.filter(element => element.id === event.target.id)[0]);
    nytapi.saveArticle({
      title: articleSaveButtonContent.volumeInfo.title,  summary: articleSaveButtonContent.volumeInfo.description,  link: articleSaveButtonContent.volumeInfo.previewLink
    })
      .then(res =>
        alert("📰 Article saved! 📰"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    nytapi.getArticles(this.state
    )
      .then(res =>
        this.setState({
          articles: res.data.response.docs
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search Term"
              />
              
             <FormBtn
                disabled={!(this.state.search )} //Modificacion 8
                onClick={this.searchArticle}
              >
                SUBMIT
              </FormBtn>
            </form>
          </Col>

            {/* <h2>{this.state.articles[0].id}</h2> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
              
            {this.state.articles.length ? (
                     
          
            <List>
                {this.state.articles.map(article => (
                    

                  <ListItem key={article.id}>
                    <strong>
                      <h2>{article.volumeInfo.title}</h2>
                      <h5>{article.volumeInfo.description}</h5>
                      {/* <h5>{article.volumeInfo.author}</h5> */}
                      <h5>{article.volumeInfo.previewLink}</h5>
                  
                       {/* <h5>{article.volumeInfo.authors[0]} </h5>                  */}
                        <img src={article.volumeInfo.imageLinks.smallThumbnail}></img>
                      {/* <h2>{article.headline.main}</h2> */}
                    </strong>

                     
                    {/* <h5>Date published: <Moment date = {article.pub_date}/></h5> */}
                    {/* <h6>{article.snippet}</h6> */}

                    {/* <a href={article.web_url} target="blank"><span role="img" aria-label="newspaper1">📰</span> Read more here <span role="img" aria-label="newspaper2">📰</span></a> */}
                    <SaveButton id={article.id} onClick={this.saveArticleFunction} />
                  </ListItem>
                ))}
              </List>
            ) :
              (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>

      </Container>
    );
  }
}


export default SearchArticles;
