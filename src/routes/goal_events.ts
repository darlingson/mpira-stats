import {Hono} from "hono";
import {supabase} from "../utils/supabaseClient.js";

const goals = new Hono();

goals.get('/', async (ctx) => {
    try {
        const page = parseInt(ctx.req.query("page") || "1", 10);
        const itemsPerPage = parseInt(ctx.req.query("itemsPerPage") || "10", 10);

        const from = (page - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;

        const {data, error, count} = await supabase
            .from("goalevents")
            .select("*", {count: "exact"})
            .range(from, to);

        if (error) {
            return ctx.json({error: error.message}, 500);
        }

        if (count === null || count === 0) {
            return ctx.json({error: "No goal events found"}, 404);
        }

        return ctx.json({
            goals: data,
            pagination: {
                page,
                itemsPerPage,
                totalItems: count,
                totalPages: Math.ceil(count / itemsPerPage),
            },
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return ctx.json({error: "Internal server error", details: errorMessage}, 500);
    }
});

goals.get('/:eventid', async (ctx) => {
    try {
        const eventid = ctx.req.param('eventid');
        const {data, error} = await supabase
            .from("goalevents")
            .select("*")
            .eq("goaleventid", eventid)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return ctx.json({error: "Goal event not found"}, 404);
            }
            return ctx.json({error: error.message}, 500);
        }

        return ctx.json({goal: data});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return ctx.json({error: "Internal server error", details: errorMessage}, 500);
    }
});

export {goals};
