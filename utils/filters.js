const { DateTime } = require('luxon')
const { toTitleCase, strToSlug } = require('./helpers');

/**
 * Filters
 * @link https://www.11ty.dev/docs/filters/
 * @see https://github.com/11ta/11ta-template/blob/main/utils/filters.js
 */
module.exports = {
    /**
     * dateToFormat allows specifying display format at point of use.
     * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }} uses .timestamp
     * from the _data/build.js export and formats it via dateToFormat.
     * Another usage example used in layouts: {{ post.date | dateToFormat("LLL dd, yyyy") }}
     * And finally, example used in /src/posts/posts.json to format the permalink
     * when working with old /yyyy/MM/dd/slug format from Wordpress exports.
     */
    dateToFormat: (date, format) => {
        return DateTime.fromJSDate(date, {
            zone: 'utc',
        }).toFormat(String(format))
    },

    /**
     * Universal slug filter strips unsafe chars from URLs
     */
    slugify: (string) => strToSlug(string),

    /**
     * Takes a list of slugs and returns them converted to title case.
     * @param list
     * @return array
     */
    formatSlugList: (list) => {
        return list.map((slug) => {
            return {
                slug,
                title: toTitleCase(slug)
            }
        })
    },

    findBySlug: (collection, slug) => {
        return (!slug)
            ? collection
            : collection.find((item) => item.slug === slug);
    },

    values: (obj, key) => obj[key],

    whereKeyEquals: (collection, key, value) => collection.filter(item => item.data[key] === value),

    /**
     * Takes a list of tags and returns them mapped with url slug.
     * @param list
     * @returns array
     */
    formatTagList: (list) => {
        return list.map((tag) => {
            return {
                name: tag,
                slug: strToSlug(tag)
            }
        })
    },

    /**
     * Takes a list and returns the limit number of items.
     */
    limit: (array, limit) => array.slice(0, limit),

    excludeType: (collection, type) => {
        return (!type)
            ? collection
            : collection.filter(item => item.data.contentType !== type);
    },

    onlyType: (collection, type) => {
        return (!type)
          ? collection
          : collection.filter(item => item.data.contentType === type);
    },

    withoutFeatured: (collection) => collection.filter(item => {
        return !item.data.featured
    }),

    onlyFeatured: (collection) => collection.filter(item => {
        return item.data.featured && item.data.featured === true;
    })
}
