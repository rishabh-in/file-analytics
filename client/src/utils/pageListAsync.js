import React from "react";
import { loadable } from "./loadable";
import Loading from "../components/common/Loading";

export const HomePage = loadable(() => import('../components/HomePage'), {fallback: <Loading />});
export const Notification = loadable(() => import("../components/Notification"), {fallback: <Loading />})
export const FileDetails = loadable(() => import("../components/FileDetails"), {fallback: <Loading />})

