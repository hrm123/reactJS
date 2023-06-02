import React from 'react'
import PropTypes from 'prop-types'
import Client from 'shopify-buy'

const client = Client.buildClient({
    domain: 'icecreamshop.myshopify.com',
    storefrontAccessToken: ''
})

function ShopProvider(props) {
    
  return (
    <div>
      
    </div>
  )
}

ShopProvider.propTypes = {

}

export default ShopProvider

