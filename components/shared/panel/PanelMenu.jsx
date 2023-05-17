import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'antd';
import { menuPrimary } from '~/public/static/data/menu';
import menu_data from '~/public/static/data/menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
const { SubMenu } = Menu;

export const getTextLang = (item) => {
    const router = useRouter();
    if (router.locale == 'ar') {
        return item.text_ar;
    }

    return item.text;
};
export const getNameLang = (item) => {
    const router = useRouter();
    if (router.locale == 'ar') {
        return item?.name_ar;
    }

    return item?.name;
};
class PanelMenu extends Component {
    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: [],
    };

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
                className="menu--mobile-2"
            >
                {menu_data.menuPrimary.menu_1.map((item) => {
                    if (item.subMenu) {
                        return (
                            <SubMenu
                                key={getTextLang(item)}
                                title={
                                    <Link href={item.url}>
                                        <a>{getTextLang(item)}</a>
                                    </Link>
                                }
                            >
                                {item.subMenu.map((subItem) => (
                                    <Menu.Item key={subItem.text}>
                                        <Link href={subItem.url}>
                                            <a>{subItem.text}</a>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    } else if (item.megaContent) {
                        return (
                            <SubMenu
                                key={getTextLang(item)}
                                title={
                                    <Link href={item.url}>
                                        <a>{getTextLang(item)}</a>
                                    </Link>
                                }
                            >
                                {item.megaContent.map((megaItem) => (
                                    <SubMenu
                                        key={megaItem.heading}
                                        title={<span>{megaItem.heading}</span>}
                                    >
                                        {megaItem.megaItems.map(
                                            (megaSubItem) => (
                                                <Menu.Item
                                                    key={megaSubItem.text}
                                                >
                                                    <Link href={item.url}>
                                                        <a>
                                                            {megaSubItem.text}
                                                        </a>
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        )}
                                    </SubMenu>
                                ))}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={getTextLang(item)}>
                                {item.type === 'dynamic' ? (
                                    <Link
                                        href={`${item.url}/[pid]`}
                                        as={`${item.url}/${item.endPoint}`}
                                    >
                                        l<a>{getTextLang(item)}</a>
                                    </Link>
                                ) : (
                                    <Link href={item.url} as={item.alias}>
                                        <a>{getTextLang(item)}</a>
                                    </Link>
                                )}
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
