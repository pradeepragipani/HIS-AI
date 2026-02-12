export const GlobalComponent = {
    // Api Calling
    API_URL: 'https://oslerhealth.me/hisai-services/api',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },

    // Auth Api
    AUTH_API: "https://oslerhealth.me/hisai-services/api",


    // Products Api
    product: 'apps/product',
    productDelete: 'apps/product/',

    // Orders Api
    order: 'apps/order',
    orderId: 'apps/order/',

    // Customers Api
    customer: 'apps/customer',
}