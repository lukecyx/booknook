"use client";

import styled, { css } from "styled-components";
import type { ComponentType, HTMLAttributes } from "react";

export const Title: ComponentType<HTMLAttributes<HTMLHeadingElement>> =
  styled.h1(
    ({ theme }) => css`
    background: ${theme.colors.background};
    height: auto;
    width: auto;
    &:hover{
      background-color: ${theme.hover.background};
  `,
  );
