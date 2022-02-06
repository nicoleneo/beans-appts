# Huggg Frontend Coding Challenge

Thanks for your interest in joining our team! This is a quick little test which is an example of the sort of work we do here at huggg.

## Intro

We have some complex, legacy API functionality and data structures which can be awkward for our API clients and front end applications to consume. The task is to use our API to display our brands with their details for our customers to browse.

## Specification

We would like you to create a frontend application (using technologies of your choice) providing the following functionality:

- Display a list of the following 4 brands with IDs, `["a9ebeb9a-8d0b-41f6-9123-cf12dc1c8fae", "a5b5876e-ad65-4260-8c3d-64fe6cb57bb3", "9fd7ed19-1dbf-11ea-b97e-02c6bf374af0", "700557f9-b39a-415c-ac8b-be66e825ef8d"]`
- The ability to select a brand and see details of the brand
- Ideally we would also see a map displaying the brand's stores

We would like to see some testing and the ideal solution would include some demonstration of a state management technique.

## API Information

Our API docs can be found at https://docs.huggg.me/

To authenticate with the API please use the [Client Login](https://docs.huggg.me/endpoints/oauth-token-client/) endpoint using the following credentials:

- Base URI: https://api.huggg.me
- Client ID: kf3fBAQ4PmPMfFbe
- Client Secret: sDt8gPFJ2PAv5WBBmfcCnzQ4EZtq3KUT

You do not need to authenticate as a user, and can use the client bearer token for subsequent requests.

To obtain brands you can use the [Get Brands List](https://docs.huggg.me/endpoints/brands-getBrands/) endpoint. From here you should be able to discover how to also obtain stores.

## Top Tips

- There's no need to spend a ton of time on this, there are better things in life.
- We will be looking for tests!
- We're looking for this to be done in ES6 or above
- We would like a change history included if possible
- If you have any questions please send them over!
