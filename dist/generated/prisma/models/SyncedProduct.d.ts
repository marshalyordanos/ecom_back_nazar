import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SyncedProduct
 *
 */
export type SyncedProductModel = runtime.Types.Result.DefaultSelection<Prisma.$SyncedProductPayload>;
export type AggregateSyncedProduct = {
    _count: SyncedProductCountAggregateOutputType | null;
    _min: SyncedProductMinAggregateOutputType | null;
    _max: SyncedProductMaxAggregateOutputType | null;
};
export type SyncedProductMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    externalProductId: string | null;
    syncedAt: Date | null;
};
export type SyncedProductMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    externalProductId: string | null;
    syncedAt: Date | null;
};
export type SyncedProductCountAggregateOutputType = {
    id: number;
    productId: number;
    externalProductId: number;
    syncedAt: number;
    _all: number;
};
export type SyncedProductMinAggregateInputType = {
    id?: true;
    productId?: true;
    externalProductId?: true;
    syncedAt?: true;
};
export type SyncedProductMaxAggregateInputType = {
    id?: true;
    productId?: true;
    externalProductId?: true;
    syncedAt?: true;
};
export type SyncedProductCountAggregateInputType = {
    id?: true;
    productId?: true;
    externalProductId?: true;
    syncedAt?: true;
    _all?: true;
};
export type SyncedProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SyncedProduct to aggregate.
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncedProducts to fetch.
     */
    orderBy?: Prisma.SyncedProductOrderByWithRelationInput | Prisma.SyncedProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SyncedProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncedProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncedProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SyncedProducts
    **/
    _count?: true | SyncedProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SyncedProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SyncedProductMaxAggregateInputType;
};
export type GetSyncedProductAggregateType<T extends SyncedProductAggregateArgs> = {
    [P in keyof T & keyof AggregateSyncedProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSyncedProduct[P]> : Prisma.GetScalarType<T[P], AggregateSyncedProduct[P]>;
};
export type SyncedProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SyncedProductWhereInput;
    orderBy?: Prisma.SyncedProductOrderByWithAggregationInput | Prisma.SyncedProductOrderByWithAggregationInput[];
    by: Prisma.SyncedProductScalarFieldEnum[] | Prisma.SyncedProductScalarFieldEnum;
    having?: Prisma.SyncedProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SyncedProductCountAggregateInputType | true;
    _min?: SyncedProductMinAggregateInputType;
    _max?: SyncedProductMaxAggregateInputType;
};
export type SyncedProductGroupByOutputType = {
    id: string;
    productId: string;
    externalProductId: string;
    syncedAt: Date;
    _count: SyncedProductCountAggregateOutputType | null;
    _min: SyncedProductMinAggregateOutputType | null;
    _max: SyncedProductMaxAggregateOutputType | null;
};
export type GetSyncedProductGroupByPayload<T extends SyncedProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SyncedProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SyncedProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SyncedProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SyncedProductGroupByOutputType[P]>;
}>>;
export type SyncedProductWhereInput = {
    AND?: Prisma.SyncedProductWhereInput | Prisma.SyncedProductWhereInput[];
    OR?: Prisma.SyncedProductWhereInput[];
    NOT?: Prisma.SyncedProductWhereInput | Prisma.SyncedProductWhereInput[];
    id?: Prisma.StringFilter<"SyncedProduct"> | string;
    productId?: Prisma.StringFilter<"SyncedProduct"> | string;
    externalProductId?: Prisma.StringFilter<"SyncedProduct"> | string;
    syncedAt?: Prisma.DateTimeFilter<"SyncedProduct"> | Date | string;
};
export type SyncedProductOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    externalProductId?: Prisma.SortOrder;
    syncedAt?: Prisma.SortOrder;
};
export type SyncedProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SyncedProductWhereInput | Prisma.SyncedProductWhereInput[];
    OR?: Prisma.SyncedProductWhereInput[];
    NOT?: Prisma.SyncedProductWhereInput | Prisma.SyncedProductWhereInput[];
    productId?: Prisma.StringFilter<"SyncedProduct"> | string;
    externalProductId?: Prisma.StringFilter<"SyncedProduct"> | string;
    syncedAt?: Prisma.DateTimeFilter<"SyncedProduct"> | Date | string;
}, "id">;
export type SyncedProductOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    externalProductId?: Prisma.SortOrder;
    syncedAt?: Prisma.SortOrder;
    _count?: Prisma.SyncedProductCountOrderByAggregateInput;
    _max?: Prisma.SyncedProductMaxOrderByAggregateInput;
    _min?: Prisma.SyncedProductMinOrderByAggregateInput;
};
export type SyncedProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.SyncedProductScalarWhereWithAggregatesInput | Prisma.SyncedProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.SyncedProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SyncedProductScalarWhereWithAggregatesInput | Prisma.SyncedProductScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SyncedProduct"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"SyncedProduct"> | string;
    externalProductId?: Prisma.StringWithAggregatesFilter<"SyncedProduct"> | string;
    syncedAt?: Prisma.DateTimeWithAggregatesFilter<"SyncedProduct"> | Date | string;
};
export type SyncedProductCreateInput = {
    id?: string;
    productId: string;
    externalProductId: string;
    syncedAt?: Date | string;
};
export type SyncedProductUncheckedCreateInput = {
    id?: string;
    productId: string;
    externalProductId: string;
    syncedAt?: Date | string;
};
export type SyncedProductUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalProductId?: Prisma.StringFieldUpdateOperationsInput | string;
    syncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SyncedProductUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalProductId?: Prisma.StringFieldUpdateOperationsInput | string;
    syncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SyncedProductCreateManyInput = {
    id?: string;
    productId: string;
    externalProductId: string;
    syncedAt?: Date | string;
};
export type SyncedProductUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalProductId?: Prisma.StringFieldUpdateOperationsInput | string;
    syncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SyncedProductUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalProductId?: Prisma.StringFieldUpdateOperationsInput | string;
    syncedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SyncedProductCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    externalProductId?: Prisma.SortOrder;
    syncedAt?: Prisma.SortOrder;
};
export type SyncedProductMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    externalProductId?: Prisma.SortOrder;
    syncedAt?: Prisma.SortOrder;
};
export type SyncedProductMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    externalProductId?: Prisma.SortOrder;
    syncedAt?: Prisma.SortOrder;
};
export type SyncedProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    externalProductId?: boolean;
    syncedAt?: boolean;
}, ExtArgs["result"]["syncedProduct"]>;
export type SyncedProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    externalProductId?: boolean;
    syncedAt?: boolean;
}, ExtArgs["result"]["syncedProduct"]>;
export type SyncedProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    externalProductId?: boolean;
    syncedAt?: boolean;
}, ExtArgs["result"]["syncedProduct"]>;
export type SyncedProductSelectScalar = {
    id?: boolean;
    productId?: boolean;
    externalProductId?: boolean;
    syncedAt?: boolean;
};
export type SyncedProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "externalProductId" | "syncedAt", ExtArgs["result"]["syncedProduct"]>;
export type $SyncedProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SyncedProduct";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        externalProductId: string;
        syncedAt: Date;
    }, ExtArgs["result"]["syncedProduct"]>;
    composites: {};
};
export type SyncedProductGetPayload<S extends boolean | null | undefined | SyncedProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload, S>;
export type SyncedProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SyncedProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SyncedProductCountAggregateInputType | true;
};
export interface SyncedProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SyncedProduct'];
        meta: {
            name: 'SyncedProduct';
        };
    };
    /**
     * Find zero or one SyncedProduct that matches the filter.
     * @param {SyncedProductFindUniqueArgs} args - Arguments to find a SyncedProduct
     * @example
     * // Get one SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncedProductFindUniqueArgs>(args: Prisma.SelectSubset<T, SyncedProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SyncedProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncedProductFindUniqueOrThrowArgs} args - Arguments to find a SyncedProduct
     * @example
     * // Get one SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncedProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SyncedProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SyncedProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductFindFirstArgs} args - Arguments to find a SyncedProduct
     * @example
     * // Get one SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncedProductFindFirstArgs>(args?: Prisma.SelectSubset<T, SyncedProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SyncedProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductFindFirstOrThrowArgs} args - Arguments to find a SyncedProduct
     * @example
     * // Get one SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncedProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SyncedProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SyncedProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncedProducts
     * const syncedProducts = await prisma.syncedProduct.findMany()
     *
     * // Get first 10 SyncedProducts
     * const syncedProducts = await prisma.syncedProduct.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const syncedProductWithIdOnly = await prisma.syncedProduct.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SyncedProductFindManyArgs>(args?: Prisma.SelectSubset<T, SyncedProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SyncedProduct.
     * @param {SyncedProductCreateArgs} args - Arguments to create a SyncedProduct.
     * @example
     * // Create one SyncedProduct
     * const SyncedProduct = await prisma.syncedProduct.create({
     *   data: {
     *     // ... data to create a SyncedProduct
     *   }
     * })
     *
     */
    create<T extends SyncedProductCreateArgs>(args: Prisma.SelectSubset<T, SyncedProductCreateArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SyncedProducts.
     * @param {SyncedProductCreateManyArgs} args - Arguments to create many SyncedProducts.
     * @example
     * // Create many SyncedProducts
     * const syncedProduct = await prisma.syncedProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SyncedProductCreateManyArgs>(args?: Prisma.SelectSubset<T, SyncedProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SyncedProducts and returns the data saved in the database.
     * @param {SyncedProductCreateManyAndReturnArgs} args - Arguments to create many SyncedProducts.
     * @example
     * // Create many SyncedProducts
     * const syncedProduct = await prisma.syncedProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SyncedProducts and only return the `id`
     * const syncedProductWithIdOnly = await prisma.syncedProduct.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SyncedProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SyncedProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SyncedProduct.
     * @param {SyncedProductDeleteArgs} args - Arguments to delete one SyncedProduct.
     * @example
     * // Delete one SyncedProduct
     * const SyncedProduct = await prisma.syncedProduct.delete({
     *   where: {
     *     // ... filter to delete one SyncedProduct
     *   }
     * })
     *
     */
    delete<T extends SyncedProductDeleteArgs>(args: Prisma.SelectSubset<T, SyncedProductDeleteArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SyncedProduct.
     * @param {SyncedProductUpdateArgs} args - Arguments to update one SyncedProduct.
     * @example
     * // Update one SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SyncedProductUpdateArgs>(args: Prisma.SelectSubset<T, SyncedProductUpdateArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SyncedProducts.
     * @param {SyncedProductDeleteManyArgs} args - Arguments to filter SyncedProducts to delete.
     * @example
     * // Delete a few SyncedProducts
     * const { count } = await prisma.syncedProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SyncedProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, SyncedProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SyncedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncedProducts
     * const syncedProduct = await prisma.syncedProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SyncedProductUpdateManyArgs>(args: Prisma.SelectSubset<T, SyncedProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SyncedProducts and returns the data updated in the database.
     * @param {SyncedProductUpdateManyAndReturnArgs} args - Arguments to update many SyncedProducts.
     * @example
     * // Update many SyncedProducts
     * const syncedProduct = await prisma.syncedProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SyncedProducts and only return the `id`
     * const syncedProductWithIdOnly = await prisma.syncedProduct.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SyncedProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SyncedProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SyncedProduct.
     * @param {SyncedProductUpsertArgs} args - Arguments to update or create a SyncedProduct.
     * @example
     * // Update or create a SyncedProduct
     * const syncedProduct = await prisma.syncedProduct.upsert({
     *   create: {
     *     // ... data to create a SyncedProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncedProduct we want to update
     *   }
     * })
     */
    upsert<T extends SyncedProductUpsertArgs>(args: Prisma.SelectSubset<T, SyncedProductUpsertArgs<ExtArgs>>): Prisma.Prisma__SyncedProductClient<runtime.Types.Result.GetResult<Prisma.$SyncedProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SyncedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductCountArgs} args - Arguments to filter SyncedProducts to count.
     * @example
     * // Count the number of SyncedProducts
     * const count = await prisma.syncedProduct.count({
     *   where: {
     *     // ... the filter for the SyncedProducts we want to count
     *   }
     * })
    **/
    count<T extends SyncedProductCountArgs>(args?: Prisma.Subset<T, SyncedProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SyncedProductCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SyncedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncedProductAggregateArgs>(args: Prisma.Subset<T, SyncedProductAggregateArgs>): Prisma.PrismaPromise<GetSyncedProductAggregateType<T>>;
    /**
     * Group by SyncedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncedProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends SyncedProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SyncedProductGroupByArgs['orderBy'];
    } : {
        orderBy?: SyncedProductGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SyncedProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncedProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SyncedProduct model
     */
    readonly fields: SyncedProductFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SyncedProduct.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SyncedProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the SyncedProduct model
 */
export interface SyncedProductFieldRefs {
    readonly id: Prisma.FieldRef<"SyncedProduct", 'String'>;
    readonly productId: Prisma.FieldRef<"SyncedProduct", 'String'>;
    readonly externalProductId: Prisma.FieldRef<"SyncedProduct", 'String'>;
    readonly syncedAt: Prisma.FieldRef<"SyncedProduct", 'DateTime'>;
}
/**
 * SyncedProduct findUnique
 */
export type SyncedProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter, which SyncedProduct to fetch.
     */
    where: Prisma.SyncedProductWhereUniqueInput;
};
/**
 * SyncedProduct findUniqueOrThrow
 */
export type SyncedProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter, which SyncedProduct to fetch.
     */
    where: Prisma.SyncedProductWhereUniqueInput;
};
/**
 * SyncedProduct findFirst
 */
export type SyncedProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter, which SyncedProduct to fetch.
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncedProducts to fetch.
     */
    orderBy?: Prisma.SyncedProductOrderByWithRelationInput | Prisma.SyncedProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SyncedProducts.
     */
    cursor?: Prisma.SyncedProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncedProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncedProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SyncedProducts.
     */
    distinct?: Prisma.SyncedProductScalarFieldEnum | Prisma.SyncedProductScalarFieldEnum[];
};
/**
 * SyncedProduct findFirstOrThrow
 */
export type SyncedProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter, which SyncedProduct to fetch.
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncedProducts to fetch.
     */
    orderBy?: Prisma.SyncedProductOrderByWithRelationInput | Prisma.SyncedProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SyncedProducts.
     */
    cursor?: Prisma.SyncedProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncedProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncedProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SyncedProducts.
     */
    distinct?: Prisma.SyncedProductScalarFieldEnum | Prisma.SyncedProductScalarFieldEnum[];
};
/**
 * SyncedProduct findMany
 */
export type SyncedProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter, which SyncedProducts to fetch.
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncedProducts to fetch.
     */
    orderBy?: Prisma.SyncedProductOrderByWithRelationInput | Prisma.SyncedProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SyncedProducts.
     */
    cursor?: Prisma.SyncedProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncedProducts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncedProducts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SyncedProducts.
     */
    distinct?: Prisma.SyncedProductScalarFieldEnum | Prisma.SyncedProductScalarFieldEnum[];
};
/**
 * SyncedProduct create
 */
export type SyncedProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * The data needed to create a SyncedProduct.
     */
    data: Prisma.XOR<Prisma.SyncedProductCreateInput, Prisma.SyncedProductUncheckedCreateInput>;
};
/**
 * SyncedProduct createMany
 */
export type SyncedProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncedProducts.
     */
    data: Prisma.SyncedProductCreateManyInput | Prisma.SyncedProductCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SyncedProduct createManyAndReturn
 */
export type SyncedProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * The data used to create many SyncedProducts.
     */
    data: Prisma.SyncedProductCreateManyInput | Prisma.SyncedProductCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SyncedProduct update
 */
export type SyncedProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * The data needed to update a SyncedProduct.
     */
    data: Prisma.XOR<Prisma.SyncedProductUpdateInput, Prisma.SyncedProductUncheckedUpdateInput>;
    /**
     * Choose, which SyncedProduct to update.
     */
    where: Prisma.SyncedProductWhereUniqueInput;
};
/**
 * SyncedProduct updateMany
 */
export type SyncedProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncedProducts.
     */
    data: Prisma.XOR<Prisma.SyncedProductUpdateManyMutationInput, Prisma.SyncedProductUncheckedUpdateManyInput>;
    /**
     * Filter which SyncedProducts to update
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * Limit how many SyncedProducts to update.
     */
    limit?: number;
};
/**
 * SyncedProduct updateManyAndReturn
 */
export type SyncedProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * The data used to update SyncedProducts.
     */
    data: Prisma.XOR<Prisma.SyncedProductUpdateManyMutationInput, Prisma.SyncedProductUncheckedUpdateManyInput>;
    /**
     * Filter which SyncedProducts to update
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * Limit how many SyncedProducts to update.
     */
    limit?: number;
};
/**
 * SyncedProduct upsert
 */
export type SyncedProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * The filter to search for the SyncedProduct to update in case it exists.
     */
    where: Prisma.SyncedProductWhereUniqueInput;
    /**
     * In case the SyncedProduct found by the `where` argument doesn't exist, create a new SyncedProduct with this data.
     */
    create: Prisma.XOR<Prisma.SyncedProductCreateInput, Prisma.SyncedProductUncheckedCreateInput>;
    /**
     * In case the SyncedProduct was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SyncedProductUpdateInput, Prisma.SyncedProductUncheckedUpdateInput>;
};
/**
 * SyncedProduct delete
 */
export type SyncedProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
    /**
     * Filter which SyncedProduct to delete.
     */
    where: Prisma.SyncedProductWhereUniqueInput;
};
/**
 * SyncedProduct deleteMany
 */
export type SyncedProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SyncedProducts to delete
     */
    where?: Prisma.SyncedProductWhereInput;
    /**
     * Limit how many SyncedProducts to delete.
     */
    limit?: number;
};
/**
 * SyncedProduct without action
 */
export type SyncedProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncedProduct
     */
    select?: Prisma.SyncedProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncedProduct
     */
    omit?: Prisma.SyncedProductOmit<ExtArgs> | null;
};
//# sourceMappingURL=SyncedProduct.d.ts.map