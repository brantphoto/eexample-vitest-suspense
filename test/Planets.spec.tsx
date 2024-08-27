import "isomorphic-fetch";
import {expect, test} from "vitest";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, {StrictMode} from "react";
import {render, screen} from "@testing-library/react";
import {Suspense} from "react";
import Planets from "../src/Planets";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import nock from "nock";

import {configure} from "@testing-library/react";

configure({asyncUtilTimeout: 4000});

test("should fail", async () => {
	if (!nock.isActive()) {
		nock.activate();
	}
	nock.disableNetConnect();

	nock("https://swapi.dev")
		.get("/api/planets/")
		.reply(200, {results: [{name: "Luke Skywalker"}]});

	const queryClient = new QueryClient();
	render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<div>Loading...</div>}>
					<Planets />
				</Suspense>
			</QueryClientProvider>,
		</StrictMode>
	);
	expect(await screen.findByText("Luke Skywalker", {})).toBeTruthy();
});

test("should fail", async () => {
	await expect(1).toBe(1);
});
