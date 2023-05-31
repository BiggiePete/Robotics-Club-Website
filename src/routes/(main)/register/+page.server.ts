import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import generatePassword from '../../../components/scripts/generatePass';
import config from '../../../config';
import type { Actions, PageServerLoad } from './$types';

const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    confirmPassword: z.string().min(8)
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match!'
      });
    }
  });

export const load: PageServerLoad = async () => {
  const form = await superValidate(registerSchema);
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, registerSchema);
    console.log(form);
    if (!form.valid) {
      return fail(400, { form });
    }
    await db.member.create({
      data: {
        firstName: form.data.name,
        passwordHash: generatePassword(form.data.password),
        email: form.data.email,
        role: {
          connectOrCreate: {
            where: {
              name: config.roles.guest.name
            },
            create: {
              name: config.roles.guest.name,
              permissionLevel: config.roles.guest.level
            }
          }
        }
      }
    });

    // generate the user token, and save the hashed password to the backend

    throw redirect(302, '/dashboard');
  }
};
