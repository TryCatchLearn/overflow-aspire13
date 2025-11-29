'use server'

import {Question} from "@/lib/types";

export async function getQuestions(tag?: string): Promise<Question[]> {
    let url = 'http://localhost:8001/questions';
    if (tag) url += `?tag=${tag}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch data');

    return response.json();
}

export async function getQuestionById(id: string): Promise<Question> {
    let url = `http://localhost:8001/questions/${id}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}