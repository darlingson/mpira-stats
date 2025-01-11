import {Hono} from "hono";
import {supabase} from "../utils/supabaseClient.js";

const player_routes = new Hono();

player_routes.get("/", async (ctx) => {
    const page = parseInt(ctx.req.query("page") || "1", 10);
    const itemsPerPage = parseInt(ctx.req.query("itemsPerPage") || "10", 10);

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const {data, error, count} = await supabase
        .from("players")
        .select("*", {count: "exact"})
        .range(from, to);

    if (error) {
        return ctx.json({error: error.message}, 500);
    }
    if (!count) {
        return ctx.json({"error": "number of players is null"});
    }
    return ctx.json({
        players: data,
        pagination: {
            page,
            itemsPerPage,
            totalItems: count,
            totalPages: Math.ceil(count / itemsPerPage),
        },
    });
});

player_routes.get('/:slug', async (ctx) => {
    const slug = ctx.req.param('slug');

    const {data, error} = await supabase.from('players').select('*').eq('slug', slug).single();

    if (error) {
        if (error.code === 'PGRST116') {
            return ctx.json({error: 'Player not found'}, 404);
        }
        return ctx.json({error: error.message}, 500);
    }

    return ctx.json({player: data});
});

player_routes.get('/:player_slug/goals', async (ctx) => {
    const slug = ctx.req.param('player_slug');

    const page = parseInt(ctx.req.query("page") || "1", 10);
    const itemsPerPage = parseInt(ctx.req.query("itemsPerPage") || "10", 10);

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const {data, error} = await supabase.from('players').select('*').eq('slug', slug).single();
    if (error) {
        if (error.code === 'PGRST116') {
            return ctx.json({error: 'Player not found'}, 404);
        }
        return ctx.json({error: error.message}, 500);
    }

    const {data: goals, error: goal_query_error, count} = await supabase
        .from('goalevents')
        .select("*", {count: "exact"})
        .range(from, to)
        .eq('playerid', data.playerid);

    if (goal_query_error) {
        return ctx.json({error: goal_query_error.message}, 500);
    }

    if (!count) {
        return ctx.json({error: "No goals found for this player"});
    }

    return ctx.json({
        player: data,
        goals,
        pagination: {
            page,
            itemsPerPage,
            totalItems: count,
            totalPages: Math.ceil(count / itemsPerPage),
        },
    });
});
export {player_routes}