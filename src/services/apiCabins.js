import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*');
  if (error) {
    console.log(error)
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabinData, id) {
  
  const hasImagePath = newCabinData.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // create cabin / edit cabin
  let query = await supabase.from("cabins")

  // a) CREATE
  if (!id) {
    query = query
      .insert([{ ...newCabinData, image: imagePath }])
      .select();
  }
  // b) EDIT
  if (id) {
    query = query
      .update({ ...newCabinData, image: imagePath })
      .eq('id', id)
      .select()
  }


  const { data, error } = await query.select();

  if (error) {
    throw new Error(error.message)
  }
  // upload image (return data if already img path)
  if(hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabinData.image);
    
  if (storageError) {
    supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.error(storageError)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  }

}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
    throw new Error("Cabin cannot be deleted")
  }

  return data;
}