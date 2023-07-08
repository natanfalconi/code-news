import useSupabase from './supabase'
// import useAuthUser from './UseAuthUser'
// import { v4 as uuidv4 } from 'uuid'

export default function useApi() {
    const { supabase } = useSupabase()
    // const { user } = useAuthUser()

    const list = async (table) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .order('id', { ascending: false })
        if (error) throw error
        return data
    }

    // const listPublic = async (table, userId) => {
    //     const { data, error } = await supabase
    //         .from(table)
    //         .select('*')
    //         .eq('user_id', userId)
    //         .order('id')
    //     if (error) throw error
    //     return data
    // }

    const listJoin = async (table, joinTable) => {
        const { data, error } = await supabase
            .from(table)
            .select(`
            *, 
            ${joinTable}(
                *
            )`).order('id', { ascending: false })

        if (error) throw error
        return data
    }

    const getById = async (table, id) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
        if (error) throw error
        return data[0]
    }
    const getByIdJoin = async (table, id, joinTable) => {
        const { data, error } = await supabase
            .from(table)
            .select(`* ,
            ${joinTable}(*)`)
            .eq('id', id)
        if (error) throw error
        return data[0]
    }

    // const post = async (table, form) => {
    //     const { data, error } = await supabase
    //         .from(table)
    //         .insert([
    //             {
    //                 ...form,
    //                 user_id: user.value.id,
    //                 created_at: new Date()
    //             }
    //         ])
    //     if (error) throw error
    //     return data
    // }

    // const update = async (table, form) => {
    //     const { data, error } = await supabase
    //         .from(table)
    //         .update({
    //             ...form,
    //         }).match({ id: form.id })

    //     if (error) throw error
    //     return data
    // }

    // const remove = async (table, id) => {
    //     const { data, error } = await supabase
    //         .from(table)
    //         .delete()
    //         .match({ id })

    //     if (error) throw error
    //     return data
    // }

    // const uploudImg = async (file, storage) => {
    //     const fileName = uuidv4()

    //     const { error } = await supabase.storage.from(storage).upload(fileName, file, {
    //         cacheControl: '3600',
    //         upsert: false
    //     })

    //     const publicUrl = await getUrlPublic(fileName, storage)

    //     console.log('publicUrl => ', publicUrl)
    //     if (error) throw error
    //     return publicUrl
    // }

    // const getUrlPublic = async (fileName, storage) => {
    //     const { data, error } = await supabase.storage.from(storage).getPublicUrl(fileName)

    //     console.log('data =>', data)
    //     if (error) throw error
    //     return data
    // }

    return {
        list,
        getById,
        listJoin,
        getByIdJoin,
        // post,
        // update,
        // remove,
        // uploudImg,
        // listPublic
    }
}