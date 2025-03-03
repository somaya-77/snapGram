import * as z from "zod";

export const SignupValidation = z.object({
    username: z.string().min(2),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).max(20),
});

// login schema 
export const LoginValidation = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8).max(20),
});

// post form 
export const PostFormValidation = z.object({
    caption: z.string().min(5).max(700),
    imageUrl: z.string().url(),
    location: z.string().min(2).max(700),
    tags: z.array(z.string()),
});

// register schema 
export const RegisterValidation = z.object({
    name: z.string().min(2).max(30),
    username: z.string().min(2).max(30),
    email: z.string().min(3).email(),
    password: z.string().min(6).max(20),
});

// comment schema 
export const CommentValidation = z.object({
    text: z.string().min(2).max(100),
    postId: z.number(),
});


// profile
export const ProfileValidation = z.object({
    imageUrl: z.string().url().optional(),


    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
});

// update profile
export const UpdateProfileValidation = z.object({
    imageUrl: z.string().url().optional(),

    name: z.string().min(2, { message: "Name must be at least 2 characters." }).optional(),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }).optional(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
});