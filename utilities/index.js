export function pushQuery(router, queryObject, link) {
    router.push(
        {
            pathname: link
                ? link
                : router.pathname?.replace('[idx]', router?.query?.idx),
            query: { ...router.query, ...queryObject },
        },
        undefined,
        { scroll: false }
    );
}
