import {Hono} from "hono";
import {supabase} from "../utils/supabaseClient.js";

const matches = new Hono();

matches.get('/:match_id/events',async (ctx) => {
    const match_id = ctx.req.param('match_id')
    const page = parseInt(ctx.req.query("page") || "1", 10);
    const itemsPerPage = parseInt(ctx.req.query("itemsPerPage") || "10", 10);

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const {data, error, count} = await supabase
        .from("goalevents")
        .select("*", {count: "exact"})
        .eq('matchid',match_id)
        .range(from, to);

    if (error) {
        return ctx.json({error: error.message}, 500);
    }
    if (!count) {
        return ctx.json({"error": "match has no goal events"},404);
    }
    return ctx.json({
        goalevents: data,
        pagination: {
            page,
            itemsPerPage,
            totalItems: count,
            totalPages: Math.ceil(count / itemsPerPage),
        },
    });
})
export {matches};