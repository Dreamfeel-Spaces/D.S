import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params }: any) {}
