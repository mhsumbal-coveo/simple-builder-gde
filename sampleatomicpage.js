const samplepage = `<style>
/* Example on how to customize CSS variables */
/* :root {
  --atomic-primary: red;
  --atomic-font-family: "Comic Sans MS", "Comic Sans", cursive;
} */

/* Example on how to customize result templates CSS parts */
/* atomic-result::part(result-link):hover {
  color: orange;
} */

/* Example on how to customize the color facet */
body {
  margin: 0;
}

.header-bg {
  background-color: var(--atomic-neutral-light);
  grid-area: 1 / -1 / 1 / 1;
}

atomic-search-layout {
  row-gap: var(--atomic-layout-spacing-y);
}

</style>
</head>

<body>
<atomic-aria-live></atomic-aria-live>
<atomic-search-interface fields-to-include='["snrating","sncost"]'>
<atomic-search-layout>
  <div class="header-bg"></div>
  <atomic-layout-section section="search">
    <atomic-search-box></atomic-search-box>
  </atomic-layout-section>
  <atomic-layout-section section="facets">
    <atomic-facet-manager>
      <atomic-category-facet field="geographicalhierarchy" label="World Atlas" with-search>
      </atomic-category-facet>
      <atomic-facet field="author" label="Authors"></atomic-facet>
      <atomic-facet field="language" label="Language"></atomic-facet>
      <atomic-facet field="objecttype" label="Type" display-values-as="link"></atomic-facet>
      <atomic-facet field="year" label="Year" display-values-as="box"></atomic-facet>
    </atomic-facet-manager>
  </atomic-layout-section>
  <atomic-layout-section section="main">
    <atomic-layout-section section="status">
      <atomic-breadbox></atomic-breadbox>
      <atomic-query-summary></atomic-query-summary>
      <atomic-refine-toggle></atomic-refine-toggle>
      <atomic-sort-dropdown>
        <atomic-sort-expression label="relevance" expression="relevancy"></atomic-sort-expression>
        <atomic-sort-expression label="most-recent" expression="date descending"></atomic-sort-expression>
      </atomic-sort-dropdown>
      <atomic-did-you-mean></atomic-did-you-mean>
    </atomic-layout-section>
    <atomic-layout-section section="results">
      <atomic-generated-answer></atomic-generated-answer>
      <atomic-result-list>
        <atomic-result-template>
          <template>
            <style>
              .field {
                display: inline-flex;
                white-space: nowrap;
                align-items: center;
              }

              .field-label {
                font-weight: bold;
                margin-right: 0.25rem;
              }

              .thumbnail {
                display: none;
                width: 100%;
                height: 100%;
              }

              .icon {
                display: none;
              }

              .result-root.image-small .thumbnail,
              .result-root.image-large .thumbnail {
                display: inline-block;
              }

              .result-root.image-icon .icon {
                display: inline-block;
              }

              atomic-result-section-badges {
                display: flex;
              }

              atomic-result-section-badges > atomic-field-condition {
                display: inline-block;
                height: 100%;
              }

              .salesforce-badge::part(result-badge-element) {
                background-color: #44a1da;
                color: white;
              }
            </style>
            <atomic-result-section-visual>
              <atomic-result-icon class="icon"></atomic-result-icon>
              <img src="https://picsum.photos/350" class="thumbnail">
            </atomic-result-section-visual>
            <atomic-result-section-badges>
              <atomic-field-condition must-match-sourcetype="Salesforce">
                <atomic-result-badge label="Salesforce" class="salesforce-badge"></atomic-result-badge>
              </atomic-field-condition>
              <atomic-field-condition class="field" if-defined="language">
                <atomic-result-badge
                  icon="https://raw.githubusercontent.com/Rush/Font-Awesome-SVG-PNG/master/black/svg/language.svg"
                >
                  <atomic-result-multi-value-text field="language"></atomic-result-multi-value-text>
                </atomic-result-badge>
              </atomic-field-condition>
            </atomic-result-section-badges>
            <atomic-result-section-title><atomic-result-link></atomic-result-link></atomic-result-section-title>
            <atomic-result-section-title-metadata>
              <atomic-field-condition class="field" if-defined="snrating">
                <atomic-result-rating field="snrating"></atomic-result-rating>
              </atomic-field-condition>
              <atomic-field-condition class="field" if-not-defined="snrating">
                <atomic-result-printable-uri max-number-of-parts="3"></atomic-result-printable-uri>
              </atomic-field-condition>
            </atomic-result-section-title-metadata>
            <atomic-result-section-excerpt><atomic-result-text field="excerpt"></atomic-result-text></atomic-result-section-excerpt>
            <atomic-result-section-bottom-metadata>
              <atomic-result-fields-list>
                <atomic-field-condition class="field" if-defined="author">
                  <span class="field-label"><atomic-text value="author"></atomic-text>:</span>
                  <atomic-result-text field="author"></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="source">
                  <span class="field-label"><atomic-text value="source"></atomic-text>:</span>
                  <atomic-result-text field="source"></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="language">
                  <span class="field-label"><atomic-text value="language"></atomic-text>:</span>
                  <atomic-result-multi-value-text field="language"></atomic-result-multi-value-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="filetype">
                  <span class="field-label"><atomic-text value="fileType"></atomic-text>:</span>
                  <atomic-result-text field="filetype"></atomic-result-text>
                </atomic-field-condition>

                <atomic-field-condition class="field" if-defined="sncost">
                  <span class="field-label">Cost:</span>
                  <atomic-result-number field="sncost">
                    <atomic-format-currency currency="CAD"></atomic-format-currency>
                  </atomic-result-number>
                </atomic-field-condition>

                <span class="field">
                  <span class="field-label">Date:</span>
                  <atomic-result-date></atomic-result-date>
                </span>
              </atomic-result-fields-list>
            </atomic-result-section-bottom-metadata>
            <atomic-table-element label="Description">
              <atomic-result-link field="title"></atomic-result-link>
              <atomic-result-text field="excerpt"></atomic-result-text>
            </atomic-table-element>
            <atomic-table-element label="author">
              <atomic-result-text field="author"></atomic-result-text>
            </atomic-table-element>
            <atomic-table-element label="source">
              <atomic-result-text field="source"></atomic-result-text>
            </atomic-table-element>
            <atomic-table-element label="language">
              <atomic-result-multi-value-text field="language"></atomic-result-multi-value-text>
            </atomic-table-element>
            <atomic-table-element label="file-type">
              <atomic-result-text field="filetype"></atomic-result-text>
            </atomic-table-element>
          </template>
        </atomic-result-template>
      </atomic-result-list>
      <atomic-query-error></atomic-query-error>
      <atomic-no-results></atomic-no-results>
    </atomic-layout-section>
    <atomic-layout-section section="pagination">
      <atomic-load-more-results></atomic-load-more-results>
      <!-- Alternative pagination
        <atomic-pager></atomic-pager>
        <atomic-results-per-page></atomic-results-per-page>
        -->
    </atomic-layout-section>
  </atomic-layout-section>
</atomic-search-layout>
</atomic-search-interface>`