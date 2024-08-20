import "isomorphic-fetch";
import { expect, test } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Characters from "../src/Characters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

import { configure } from "@testing-library/react";

configure({ asyncUtilTimeout: 4000 });

test("should fail", async () => {
	if (!nock.isActive()) {
		nock.activate();
	}
	nock.disableNetConnect();

	nock("https://swapi.dev")
		.get("/api/planets/")
		.reply(200, { results: [{ name: "Luke Skywalker" }] });

	const queryClient = new QueryClient();
	render(
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<Characters />
			</Suspense>
		</QueryClientProvider>,
	);
	expect(await screen.findByText("Luke Skywalker", {})).toBeTruthy();
});

test("test 2", async () => {
	expect(1).toBe(1);
});
