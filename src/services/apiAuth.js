import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: {
        full_name,
        avatar: ""
      }
    }
  })
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data.user;
}
export async function updateUser({ password, fullName, avatar }) {
  // update password or full-name
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)

  if (!avatar) return data;

  //upload the avatar image
  const filename = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from("avatars").upload(filename, avatar)

  if (storageError) throw new Error(storageError.message);

  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`

  const { updatedAvatarUser, errorUpdatedAvatarUsar } = await supabase.auth.updateUser({ data: { avatar: avatarUrl } })

  if (errorUpdatedAvatarUsar) throw new Error(errorUpdatedAvatarUsar.message);

  return updatedAvatarUser;

}