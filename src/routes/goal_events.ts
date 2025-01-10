import { Hono } from "hono";
import { supabase } from "../utils/supabaseClient.js";

const goals = new Hono();

goals.get('/', async(ctx)=>{
    const {data,error} = await supabase.from("goalevents").select('*');

    if(error){
        return ctx.json({error:error.message});
    }

    return ctx.json({goals:data});
})
goals.get('/:eventid',async(ctx)=>{
    const eventid = ctx.req.param('eventid')
    const {data, error} = await supabase.from("goalevents").select('*').eq('goaleventid',eventid).select('*').single();

    if (error) {
        if (error.code === 'PGRST116') {
            return ctx.json({ error: 'Team not found' }, 404);
        }
        return ctx.json({ error: error.message }, 500);
    }

    return ctx.json({ goal: data });
})

export {goals}