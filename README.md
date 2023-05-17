## PriceShare TEMPLATE - REACT VERSION v2.2.0 


### Installation

```bash
npm install
```

or Yarn

```bash
yarn install
```

### Develope

```bash
yarn dev
```


### Dev Mode vs. Prod Mode

To run the app in dev mode:
- Follow the regular React installation steps
- In the services folder --> GeneralService.js --> devmode occurrences should be true
- In the components folder --> partials folder --> headers folder --> HeaderDefault.jsx --> stores.stores[1] (2 occurrences)

To run the app in prod mode:
- Follow the regular React installation steps
- In the services folder --> GeneralService.js --> devmode occurrences should be false
- In the components folder --> partials folder --> headers folder --> HeaderDefault.jsx --> stores.stores[0] (2 occurrences)


### Info

This template contains extra components in case you need to reuse for faster shipping of releases. We've outlined the currently used pages for the PriceShare platform:
- http://localhost:3000/ (homepage)
- http://localhost:3000/shop (shop)
- http://localhost:3000/product/7 (single product)
- http://localhost:3000//account/wallet
- http://localhost:3000//account/user-information
- http://localhost:3000/account/orders
- http://localhost:3000/account/orders/8
- http://localhost:3000/account/wishlist (wishlist)
- http://localhost:3000/account/shopping-cart (cart)
- http://localhost:3000/account/checkout (checkout)
- http://localhost:3000/store/global-office (single vendor store)
- http://localhost:3000/vendor/become-a-vendor
- http://localhost:3000/page/faqs
- http://localhost:3000/account/checkout
- http://localhost:3000/contact-us
- http://localhost:3000/termsofuse
- http://localhost:3000/privacypolicy
- http://localhost:3000/ps/priceshare-url-check
- http://localhost:3000/ps/priceshare-packages
- http://localhost:3000/ps/priceshare-checkout
- http://localhost:3000/account/payment
- http://localhost:3000/account/payment-success
- http://localhost:3000/ps/priceshare-subscribed

These are the headers needed when accessing on country level
```bash
const headers = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${
            JSON.parse(localStorage.getItem('userData'))?.token
        }`,
        'X-CSP':
            generalService.domainURLValue() +
            generalService.domainURLSchemaValue(),
        'X-CS': generalService.domainURLValue(),
    },
};
```
These are the headers needed when accessing on global level
```bash
const headers = {
    headers: {
        'Content-Type': 'application/json',
        'X-CS': generalService.domainURLValue(),
    },
};
```
