/* eslint-disable @typescript-eslint/ban-types */
import { Component } from '@/types/react';

type ChildrenType = Component.Children;

type ParamsType = {
  /** Router parameters (placeholders). */
  params: { [key: string]: string };
};

type SearchParamsType = {
  /** Page parameters (query parameters). */
  searchParams: { [key: string]: string | string[] | undefined };
};

type ErrorType = {
  /** Error object with a digest to track the error in logs. */
  error: Error & { digest?: string };
  /** Error reset/retry function */
  reset: () => void;
};

/** Common wrapper component props */
export interface ContainerProps extends ChildrenType {}

/** Next.js App layout props. */
export interface LayoutProps extends ChildrenType, ParamsType {}

/** Next.js App template props. */
export interface TemplateProps extends ChildrenType {}

/** Next.js App page props. */
export interface PageProps extends ParamsType, SearchParamsType {}

/** Next.js App loading page props. */
export interface LoadingProps extends Object {}

/** Next.js App not-found page props. */
export interface NotFoundProps extends Object {}

/** Next.js App error page props. */
export interface ErrorProps extends ErrorType {}

/** Next.js App global error page props. */
export interface GlobalErrorProps extends ErrorType {}

export type {
  MetadataRoute,
  Metadata,
  ResolvingMetadata,
  ResolvedMetadata,
  Viewport,
  ResolvingViewport,
  ResolvedViewport,
} from 'next';

/** Next.js App Router {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config "Route Segment Config"} exportable variables types. Usage `export const dynamic: RouteSegmentConfig['dynamic'] = 'auto';` */
export type RouteSegmentConfig = {
  /** Default: `'auto'`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic Next.js Docs} */
  dynamic: 'auto' | 'force-dynamic' | 'error' | 'force-static';
  /** Default: `true`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams Next.js Docs} */
  dynamicParams: boolean;
  /** Default: `false`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate Next.js Docs} */
  revalidate: false | 'force-cache' | 0 | number;
  /** Default: `'auto'`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#fetchcache Next.js Docs} */
  fetchCache: 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store';
  /** Default: `'nodejs'`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime Next.js Docs} */
  runtime: 'nodejs' | 'edge';
  /** Default: `'auto'`. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#preferredregion Next.js Docs} */
  preferredRegion: 'auto' | 'global' | 'home' | string | string[];
  /** Default: Set by deployment platform. {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config Next.js Docs} */
  maxDuration: number;
};
