// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions:Actions = {
    default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const title = String(data.get('title'));
        const coverImage = String(data.get('coverImage'));
        const content = String(data.get('content'));
        
        const slug = convertToSlug(title)

        const entry = await prisma.blogContent.create({
            data: { title, coverImage, content, slug }
        });

        if (entry)
            throw redirect(302, `/blog/${entry.slug}`)

    }
};
