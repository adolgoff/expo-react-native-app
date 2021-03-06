import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Title,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import { commonStyles, productsListStyles } from '~/assets/styles';
import { fetchProducts } from '~/actions/products';
import { getProductsList } from '~/selectors/products';
import { ProductType } from '~/__types__';

class ProductsListScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  handleProductClick = productId => () => {
    this.props.navigation.navigate('ProductDetails', { productId });
  };

  handleLogoutButtonClick = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderProduct = product => (
    <ListItem icon key={product.id} onPress={this.handleProductClick(product.id)}>
      <Left>
        <Icon type="Entypo" name={product.icon} style={productsListStyles.productIcon} />
      </Left>
      <Body>
        <Text>{product.name}</Text>
      </Body>
      <Right>
        <Icon type="Entypo" name="chevron-right" />
      </Right>
    </ListItem>
  );

  render() {
    const { productsList } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title style={commonStyles.titleText}>
              Products
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.handleLogoutButtonClick}>
              <Icon type="SimpleLineIcons" name='logout' style={commonStyles.titleIcon} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {productsList.map(this.renderProduct)}
          </List>
        </Content>
      </Container>
    );
  }
}

ProductsListScreen.propTypes = {
  productsList: PropTypes.arrayOf(ProductType).isRequired,
};

ProductsListScreen.defaultProps = {
  productsList: [],
};

const mapStateToProps = state => ({
  productsList: getProductsList(state),
});

export default connect(mapStateToProps)(ProductsListScreen);
