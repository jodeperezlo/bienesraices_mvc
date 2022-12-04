// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export const generateId = () =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);
