import { Request } from "express";


export interface Parsed<T> extends Request {
    body : T
}