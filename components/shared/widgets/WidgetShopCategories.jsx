import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Checkbox, Row, Col, Radio, Slider } from 'antd';
import useTranslation from '~/config/lang';
import { pushQuery } from '~/utilities';

const WidgetShopCategories = ({ query }) => {
    const { Translate: t } = useTranslation();
    const Router = useRouter();
    const [categories, setCategories] = useState(null);
    const [categoriesSelectedValues, setCategoriesSelectedValues] = useState(
        query?.category?.split(',').map(function (item) {
            return parseInt(item);
        }) || []
    );
    const [brandsSelectedValues, setBrandsSelectedValues] = useState(
        query?.brands?.split(',').map(function (item) {
            return parseInt(item);
        }) || []
    );

    const [loading, setLoading] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [brands, setBrands] = useState(null);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5000);
    const [minSliderValue, setMinSliderValue] = useState(query?.price_gt || 0);
    const [maxSliderValue, setMaxSliderValue] = useState(
        query?.price_lt || 5000
    );
    // const [globalMax, setGlobalMax] = useState(0);
    const [priceChange, setPriceChange] = useState(false);

    const { slug } = Router.query;

    //     useEffect(()=>{

    //         if(Router.query?.category){
    //             let categoriesData = []
    //  Router.query?.category.split(',').map(function(item) {
    //     return parseInt(item)
    // });
    // setCategoriesSelectedValues([...categoriesData])
    //         }
    //     },[Router.query?.category])

    console.log(brandsSelectedValues, 'categoriesSelectedValues');
    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getCategories();
        if (responseData) {
            setCategories(responseData.results);
            console.log(responseData.global_max_price);
            setMax(responseData.global_max_price);
            // setGlobalMax(responseData.global_max_price);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    async function getBrands() {
        setLoadingBrands(true);
        const responseData = await ProductRepository.getBrands();
        if (responseData) {
            setBrands(responseData);
            setTimeout(
                function () {
                    setLoadingBrands(false);
                }.bind(this),
                250
            );
        }
    }

    function handleChangeRange(value) {
        setPriceChange(true);
        // console.log(globalMax)
        // console.log(max)
        // setMin(value[0]), setMax(value[1]);

        price_lt: value[1];

        /*  const params = {
            price_gt: value[0],
        };*/
        pushQuery(Router, { price_gt: value[0], price_lt: value[1] });

        console.log(value, 'sliderValue');
        // setMinSliderValue(value[0])
        // setMaxSliderValue(value[1])
        // if (
        //     categoriesSelectedValues?.length > 0 &&
        //     brandsSelectedValues.length > 0
        // ) {
        //     Router.push(
        //         `/shop?category=${categoriesSelectedValues}&brands=${brandsSelectedValues}&price_gt=${value[0]}&price_lt=${value[1]}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (
        //     categoriesSelectedValues?.length > 0 &&
        //     brandsSelectedValues.length === 0
        // ) {
        //     Router.push(
        //         `/shop?category=${categoriesSelectedValues}&price_gt=${value[0]}&price_lt=${value[1]}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (
        //     categoriesSelectedValues?.length == 0 &&
        //     brandsSelectedValues.length > 0
        // ) {
        //     Router.push(
        //         `/shop?brands=${brandsSelectedValues}&price_gt=${value[0]}&price_lt=${value[1]}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else {
        //     Router.push(
        //         `/shop?price_gt=${value[0]}&price_lt=${value[1]}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // }

        // Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    useEffect(() => {
        getBrands();
        getCategories();
    }, []);

    // Views

    function onChange(checkedValues) {
        console.log(checkedValues, 'brandsSelectedValues');
        setCategoriesSelectedValues(checkedValues);
        // Router.push(`/shop?category=${checkedValues}`);

        pushQuery(Router, { category: checkedValues.toString() });
        //  Router.push(
        //         `/shop?category=${checkedValues}&brands=${brandsSelectedValues}&price_gt=${min}&price_lt=${max}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // if (brandsSelectedValues.length > 0 && priceChange) {
        //     Router.push(
        //         `/shop?category=${checkedValues}&brands=${brandsSelectedValues}&price_gt=${min}&price_lt=${max}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (brandsSelectedValues.length > 0 && !priceChange) {
        //     Router.push(
        //         `/shop?category=${checkedValues}&brands=${brandsSelectedValues}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (categoriesSelectedValues?.length == 0 && priceChange) {
        //     Router.push(
        //         `/shop?category=${checkedValues}&price_gt=${min}&price_lt=${max}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else {
        //     Router.push(`/shop?category=${checkedValues}`, undefined, {
        //         scroll: false,
        //     });
        // }

        //  console.log('checked = ', checkedValues);
    }

    function handleSelectBrand(checkedValues) {
        setBrandsSelectedValues(checkedValues);

        pushQuery(Router, { brands: checkedValues.toString() });
        // if (categoriesSelectedValues?.length > 0 && priceChange ) {
        //     Router.push(
        //         `/shop?category=${categoriesSelectedValues}&brands=${checkedValues}&price_gt=${min}&price_lt=${max}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (categoriesSelectedValues?.length > 0 && !priceChange) {
        //     Router.push(
        //         `/shop?category=${categoriesSelectedValues}&brands=${checkedValues}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else if (categoriesSelectedValues?.length == 0 && priceChange) {
        //     Router.push(
        //         `/shop?brands=${brandsSelectedValues}&price_gt=${min}&price_lt=${max}`,
        //         undefined,
        //         { scroll: false }
        //     );
        // } else {
        //     Router.push(`/shop?brands=${checkedValues}`, undefined, {
        //         scroll: false,
        //     });
        // }

        // Router.push(`/shop?category=${checkedValues}&price_lt=${value[1]}`);
        // setBrandsSelectedValues(checkedValues)
        console.log('checked = ', checkedValues);
    }

    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                // <li
                //     key={item.slug}
                //     className={item.slug === slug ? 'active' : ''}>
                //     <Link href={`/category/${item.id}`}>{item.name}</Link>
                // </li>
                <Row span={8} key={item.id}>
                    <Checkbox value={item.id} key={item.id}>
                        {Router.locale == 'ar' ? item.name_ar : item.name}
                    </Checkbox>
                </Row>
            ));
            categoriesView = (
                <ul className="ps-list--categories sideMenu">{items}</ul>
            );
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    // Views
    let brandsView;
    if (!loadingBrands) {
        if (brands && brands.length > 0) {
            const items = brands.map((item) => (
                <Row key={item.id}>
                    <Checkbox value={item.id} key={item.id}>
                        {Router.locale == 'ar' ? item.name_ar : item.name}
                    </Checkbox>
                </Row>
            ));
            brandsView = <ul className="ps-list--brands">{items}</ul>;
        } else {
        }
    } else {
        brandsView = <p>Loading...</p>;
    }

    return (
        <div>
            <aside className="widget widget_shop makeItFlexWithDir">
                <h4 className="widget-title">{t('categories')}</h4>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={onChange}
                    defaultValue={categoriesSelectedValues}
                >
                    {categoriesView}
                </Checkbox.Group>
                <Row></Row>
            </aside>

            <aside className="widget widget_shop widget_shop--brand makeItFlexWithDir">
                <h4 className="widget-title">{t('by_brands')}</h4>
                <figure className="makeItFlexWithDir">
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        defaultValue={brandsSelectedValues}
                        onChange={handleSelectBrand}
                    >
                        {brandsView}
                    </Checkbox.Group>

                    {/* <Radio.Group
                    defaultValue={slug}
                    options={brands}
                    onChange={handleSelectBrand}
                /> */}
                </figure>
            </aside>

            <aside className="widget widget_shop" style={{ display: 'block' }}>
                <figure>
                    <h4 className="widget-title">{t('by_price')}</h4>
                    {max > 0 ? (
                        <>
                            <Slider
                                key={'slider-2022'}
                                defaultValue={[minSliderValue, maxSliderValue]}
                                range
                                max={max}
                                // min={min}
                                onAfterChange={(e) => handleChangeRange(e)}
                            />
                            <p className="price-range">
                                {t('price')}: ${minSliderValue} - ${' '}
                                {maxSliderValue}
                            </p>
                        </>
                    ) : (
                        ''
                    )}
                </figure>
            </aside>
        </div>
    );
};

export default WidgetShopCategories;
