import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/db";

let pLevel = 0;

const createProSchema = z.object({
    title: z.string(),
    description: z.string(),
    docsLink: z.string(),
    season: z.custom(),
    year: z.string(),
    logo: z.string(),
    Skills: z.string().array(),
});

export const load: PageServerLoad = async ({ parent, locals }) => {
    const data = await parent();
    pLevel = data.member!.role.permissionLevel;
    // check user permission level
    if (!(pLevel >= 10)) {
        throw redirect(302, '/dashboard');
    }

    const members = await db.member.findMany({
        where: {
          email: {not: locals.member?.email},
        },
        select: {
          id: true,
          discordProfileName: true,
          firstName: true,
          lastName: true
        }
    });

    const form = await superValidate(createProSchema);
    return { form, members };
};

export const actions: Actions = {
    default: async({ request }) => {
        const form = await superValidate(request, createProSchema);
        // Validating forms
        if (!form.valid) {
            return fail(400, { form });
        }

        const selectedyear = form.data.year;
        const vaildTitle = form.data.title;
        const vaildDocsLink = form.data.docsLink;
        const vaildSeason = form.data.season;
        const vaildLogo = form.data.logo;
        const yearNum = parseInt(selectedyear);


        if (vaildTitle === ''){
            return setError(form, 'title', 'Please Enter a Title');
        }
        if (vaildLogo === ''){
            return setError(form, 'logo', 'Please Enter a Logo-Link');
        }
        if (vaildDocsLink === ''){
            return setError(form, 'docsLink', 'Please Enter a Docs-Link');
        }
        if (vaildSeason === ''){
            return setError(form, 'season', 'Please Enter a Season');
        }
        if (selectedyear === '' || !yearNum) {
            return setError(form, 'year', 'Please Enter a Valid Year');
        }
        // console.log("raw skills: ", form.data.Skills);
        const skillsArray = form.data.Skills[0].split(',');
        // console.log("split skills: ", skillsArray);

        // Creating survey entry in the database
        await db.project.create({
            data: {
                title: form.data.title,
                description: form.data.description,
                logo: {
                    create: {
                        data: form.data.logo,
                        isLocal: false,
                    }
                },
                docsLink: form.data.docsLink,
                season: form.data.season,
                year: yearNum,
                Skills: skillsArray,
                budget: 0, 
                remainingFunds: 0,
            }
        });

        throw redirect(302, '/projects');
    }
};
