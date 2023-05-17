import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
// import { getColletionBySlug } from '../../../../utilities/product-helper';
import CollectionProducts from './modules/CollectionProducts';
import ProductRepository from '~/repositories/ProductRepository';

class ConsumerElectronics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            currentCollection: 'new_arrivals',
        };
    }

    handleChangeProduct(e, currentItem, slug) {
        e.preventDefault();
        const { collections } = this.props;
        const items = ProductRepository.filterProductsCategories(
            collections,
            slug
        );
        this.setState({
            currentCollection: currentItem,
            items: items,
        });
    }

    render() {
        const { collections, collectionSlug } = this.props;
        const { currentCollection, items } = this.state;
        const products = ProductRepository.filterProductsCategories(
            collections,
            collectionSlug
        );
        const sectionLinks = [
            {
                title: t('new_arrivals'),
                name: 'new_arrivals',
                slug: 'consumer_electronics',
            },
            {
                title: t('best_seller'),
                name: 'best_seller',
                slug: 'fullwidth-consumer-electronic-best-seller',
            },
            {
                title: t('most_popular'),
                name: 'most_popular',
                slug: 'fullwidth-consumer-electronic-most-popular',
            },
        ];
        let sectionItems;
        if (currentCollection !== 'new_arrivals') {
            sectionItems = <CollectionProducts products={items} />;
        } else {
            if (products && products.length > 0) {
                sectionItems = <CollectionProducts products={products} />;
            } else {
                sectionItems = <p>No Record(s)</p>;
            }
        }
        return (
            <div className="ps-product-list ps-garden-kitchen">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>{t('consumer_electronics')}ss</h3>
                        <ul className="ps-section__links">
                            {sectionLinks.map((link) => (
                                <li
                                    className={
                                        currentCollection === link.name
                                            ? 'active'
                                            : ''
                                    }
                                    key={link.name}
                                >
                                    <a
                                        onClick={(e) =>
                                            this.handleChangeProduct(
                                                e,
                                                link.name,
                                                link.slug
                                            )
                                        }
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link href="/shop">
                                    <a>t("view_all")</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">{sectionItems}</div>
                </div>
            </div>
        );
    }
}

export default connect((state) => state.collection)(ConsumerElectronics);
