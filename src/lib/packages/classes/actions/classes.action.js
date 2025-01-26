'use server';

import { createNewClass } from '@/lib/packages/classes/classes.service';
import { revalidatePath } from 'next/cache';

/**
 * submitCreateNewClass
 * @param {Object} previous
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, error: null|string}>}
 */
export async function submitCreateNewClass(previous, formData) {
  try {
    /**
     * @type {CreateNewClassInput}
     */
    const data = Object.fromEntries(formData);

    await createNewClass(data);
    revalidatePath('/class-rooms');
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to create class', success: false };
  }
}
