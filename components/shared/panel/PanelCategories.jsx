import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
import ProductRepository from '~/repositories/ProductRepository';
import { withRouter } from 'next/router';

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
        this.getCategories();
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
        categories: [],
    };

    async getCategories() {
        await ProductRepository.getCategories().then((responseData) => {
            console.log('results in');
            this.setState({ categories: responseData.results });
        });
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
            >
                {this.state.categories.map((category) => (
                    <Menu.Item key={category.id}>
                        <a href={`/shop?category=${category.id}`}>
                            {this.props.router.locale == 'ar'
                                ? category.name_ar
                                : category.name}
                        </a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default withRouter(PanelCategories);
