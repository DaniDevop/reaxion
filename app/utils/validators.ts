import vine from "@vinejs/vine";

export const createPostValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(6),
    password: vine.string().trim(),
    role: vine.string().trim().escape(),
    email: vine.string().trim().email(),
  })
)

