import { SITE } from '~/utils/constants';

export default (payload) => {
    const payloadDate = new Date(payload.date);
    const payloadModified = new Date(payload.modified);
    const date = ((payloadModified > payloadDate && payloadModified) || payloadDate).toString();

    const categories = payload.embed.categories.map((category) => ({
        ...category,
        link: category.link.replace(SITE.LINK, ''),
    }));

    const featuredMedia = payload.embed_featured_media;
    const featuredMediaRatio = featuredMedia.width / featuredMedia.height;
    const featuredMediaValid = (
        featuredMediaRatio > 1.2
        && featuredMedia.width > 1200
    ) || false;

    let related = payload['jetpack-related-posts']
        .filter((post) => post.img.src !== '');
    if (related.length > 3) related.splice(3);
    related = related.map((post) => {
        let slug = post.url.replace(SITE.LINK, '');
        slug = slug.replace(/\//g, '');

        return {
            title: post.title,
            slug,
            featuredMedia: {
                src: post.img.src,
                width: post.img.width,
                height: post.img.height,
                alt: post.img.alt_text || 'post featured image',
            },
        };
    });

    return {
        head: {
            title: payload.title.rendered,
            link: [
                { rel: 'canonical', href: payload.link },
            ],
            meta: payload.yoast_meta,
        },
        main: {
            id: payload.id,
            link: payload.link,
            ...(featuredMediaValid && { featuredMedia }),
            title: payload.title.rendered,
            content: payload.content,
            commentsNumber: payload.comments_number,
            categories,
            date,
        },
        related,
    };
};
