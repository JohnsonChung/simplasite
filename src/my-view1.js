/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import './shared-styles.js';


class MyView1 extends PolymerElement {
    static get template() {
        return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
        
      
      <div class="card">
        <iron-image preload src="[[data.media.url]]" sizing="cover" width="400" height="250"></iron-image>        
        <h1>View One : [[myname]]</h1>
        <pre>[[_toString(data)]]</pre>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      </div>
    `;
    }

    static get properties() {
        return {
            myname: {
                type: String,
                value: 'Johnson'
            },
        }
    }

    ready() {
        super.ready();

        // Tipe GraphQL API
        var DOCUMENT_ID = '5b59dda2dd915e0013460665';
        var YOUR_ORG_SECRET_KEY = 'NWI1OWRkOTFlMzkwNzEwMDEzNGY2NGIw';
        var YOUR_API_KEY = '7RBYAEZ3WC9AEQ99JJ8QGMDBO'; // Generated-API-Key-1532616103131

        var variables = { id: DOCUMENT_ID }
        var query = `
            query API($id: ID!) {
              TweetExample(id: $id) {
                message
                url
                hashtags
                media {
                  id
                  name
                  size
                  url
                }
                _meta {
                  id
                  name
                  updatedAt
                  createdAt
                  published
                }
              }
            }
            `;

        // you need to i    nclude a "fetch" polyfill for Safari'
        window.fetch('https://api.tipe.io/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': YOUR_API_KEY,
                'Tipe-Id': YOUR_ORG_SECRET_KEY
            },
            body: JSON.stringify({query: query, variables: variables})
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (result) {
                console.log(result);
                this.data = result.data.TweetExample;
                this.myname = result.data.TweetExample.message;
        }.bind(this));
    }

    _toString(data) {
        return JSON.stringify(data, null, ' ')
    }
}

window.customElements.define('my-view1', MyView1);
