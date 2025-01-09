import {Hono} from "hono";
import {supabase} from "../utils/supabaseClient.js";

const team_routes = new Hono();

team_routes.get('/', async (ctx) => {
    const { data, error } = await supabase.from('teams').select('*');

    if (error) {
        return ctx.json({ error: error.message }, 500);
    }

    return ctx.json({ teams: data });
});

team_routes.get('/:slug', async (ctx) => {
    const slug = ctx.req.param('slug');

    const { data, error } = await supabase.from('teams').select('*').eq('slug', slug).single();

    if (error) {
        if (error.code === 'PGRST116') {
            return ctx.json({ error: 'Team not found' }, 404);
        }
        return ctx.json({ error: error.message }, 500);
    }

    return ctx.json({ team: data });
});

export {team_routes}