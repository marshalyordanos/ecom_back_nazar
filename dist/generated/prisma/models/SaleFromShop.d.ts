import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SaleFromShop
 *
 */
export type SaleFromShopModel = runtime.Types.Result.DefaultSelection<Prisma.$SaleFromShopPayload>;
export type AggregateSaleFromShop = {
    _count: SaleFromShopCountAggregateOutputType | null;
    _avg: SaleFromShopAvgAggregateOutputType | null;
    _sum: SaleFromShopSumAggregateOutputType | null;
    _min: SaleFromShopMinAggregateOutputType | null;
    _max: SaleFromShopMaxAggregateOutputType | null;
};
export type SaleFromShopAvgAggregateOutputType = {
    quantity: number | null;
    price: number | null;
    total: number | null;
};
export type SaleFromShopSumAggregateOutputType = {
    quantity: number | null;
    price: number | null;
    total: number | null;
};
export type SaleFromShopMinAggregateOutputType = {
    id: string | null;
    locationId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: number | null;
    total: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SaleFromShopMaxAggregateOutputType = {
    id: string | null;
    locationId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: number | null;
    total: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SaleFromShopCountAggregateOutputType = {
    id: number;
    locationId: number;
    variantId: number;
    quantity: number;
    price: number;
    total: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SaleFromShopAvgAggregateInputType = {
    quantity?: true;
    price?: true;
    total?: true;
};
export type SaleFromShopSumAggregateInputType = {
    quantity?: true;
    price?: true;
    total?: true;
};
export type SaleFromShopMinAggregateInputType = {
    id?: true;
    locationId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SaleFromShopMaxAggregateInputType = {
    id?: true;
    locationId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SaleFromShopCountAggregateInputType = {
    id?: true;
    locationId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SaleFromShopAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SaleFromShop to aggregate.
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SaleFromShops to fetch.
     */
    orderBy?: Prisma.SaleFromShopOrderByWithRelationInput | Prisma.SaleFromShopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SaleFromShopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SaleFromShops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SaleFromShops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SaleFromShops
    **/
    _count?: true | SaleFromShopCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SaleFromShopAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SaleFromShopSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SaleFromShopMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SaleFromShopMaxAggregateInputType;
};
export type GetSaleFromShopAggregateType<T extends SaleFromShopAggregateArgs> = {
    [P in keyof T & keyof AggregateSaleFromShop]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSaleFromShop[P]> : Prisma.GetScalarType<T[P], AggregateSaleFromShop[P]>;
};
export type SaleFromShopGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleFromShopWhereInput;
    orderBy?: Prisma.SaleFromShopOrderByWithAggregationInput | Prisma.SaleFromShopOrderByWithAggregationInput[];
    by: Prisma.SaleFromShopScalarFieldEnum[] | Prisma.SaleFromShopScalarFieldEnum;
    having?: Prisma.SaleFromShopScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SaleFromShopCountAggregateInputType | true;
    _avg?: SaleFromShopAvgAggregateInputType;
    _sum?: SaleFromShopSumAggregateInputType;
    _min?: SaleFromShopMinAggregateInputType;
    _max?: SaleFromShopMaxAggregateInputType;
};
export type SaleFromShopGroupByOutputType = {
    id: string;
    locationId: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    _count: SaleFromShopCountAggregateOutputType | null;
    _avg: SaleFromShopAvgAggregateOutputType | null;
    _sum: SaleFromShopSumAggregateOutputType | null;
    _min: SaleFromShopMinAggregateOutputType | null;
    _max: SaleFromShopMaxAggregateOutputType | null;
};
type GetSaleFromShopGroupByPayload<T extends SaleFromShopGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SaleFromShopGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SaleFromShopGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SaleFromShopGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SaleFromShopGroupByOutputType[P]>;
}>>;
export type SaleFromShopWhereInput = {
    AND?: Prisma.SaleFromShopWhereInput | Prisma.SaleFromShopWhereInput[];
    OR?: Prisma.SaleFromShopWhereInput[];
    NOT?: Prisma.SaleFromShopWhereInput | Prisma.SaleFromShopWhereInput[];
    id?: Prisma.StringFilter<"SaleFromShop"> | string;
    locationId?: Prisma.StringFilter<"SaleFromShop"> | string;
    variantId?: Prisma.StringFilter<"SaleFromShop"> | string;
    quantity?: Prisma.IntFilter<"SaleFromShop"> | number;
    price?: Prisma.FloatFilter<"SaleFromShop"> | number;
    total?: Prisma.FloatFilter<"SaleFromShop"> | number;
    createdAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
    location?: Prisma.XOR<Prisma.ShopLocationScalarRelationFilter, Prisma.ShopLocationWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantScalarRelationFilter, Prisma.ProductVariantWhereInput>;
};
export type SaleFromShopOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    location?: Prisma.ShopLocationOrderByWithRelationInput;
    variant?: Prisma.ProductVariantOrderByWithRelationInput;
};
export type SaleFromShopWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SaleFromShopWhereInput | Prisma.SaleFromShopWhereInput[];
    OR?: Prisma.SaleFromShopWhereInput[];
    NOT?: Prisma.SaleFromShopWhereInput | Prisma.SaleFromShopWhereInput[];
    locationId?: Prisma.StringFilter<"SaleFromShop"> | string;
    variantId?: Prisma.StringFilter<"SaleFromShop"> | string;
    quantity?: Prisma.IntFilter<"SaleFromShop"> | number;
    price?: Prisma.FloatFilter<"SaleFromShop"> | number;
    total?: Prisma.FloatFilter<"SaleFromShop"> | number;
    createdAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
    location?: Prisma.XOR<Prisma.ShopLocationScalarRelationFilter, Prisma.ShopLocationWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantScalarRelationFilter, Prisma.ProductVariantWhereInput>;
}, "id">;
export type SaleFromShopOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SaleFromShopCountOrderByAggregateInput;
    _avg?: Prisma.SaleFromShopAvgOrderByAggregateInput;
    _max?: Prisma.SaleFromShopMaxOrderByAggregateInput;
    _min?: Prisma.SaleFromShopMinOrderByAggregateInput;
    _sum?: Prisma.SaleFromShopSumOrderByAggregateInput;
};
export type SaleFromShopScalarWhereWithAggregatesInput = {
    AND?: Prisma.SaleFromShopScalarWhereWithAggregatesInput | Prisma.SaleFromShopScalarWhereWithAggregatesInput[];
    OR?: Prisma.SaleFromShopScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SaleFromShopScalarWhereWithAggregatesInput | Prisma.SaleFromShopScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SaleFromShop"> | string;
    locationId?: Prisma.StringWithAggregatesFilter<"SaleFromShop"> | string;
    variantId?: Prisma.StringWithAggregatesFilter<"SaleFromShop"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"SaleFromShop"> | number;
    price?: Prisma.FloatWithAggregatesFilter<"SaleFromShop"> | number;
    total?: Prisma.FloatWithAggregatesFilter<"SaleFromShop"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SaleFromShop"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SaleFromShop"> | Date | string;
};
export type SaleFromShopCreateInput = {
    id?: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    location: Prisma.ShopLocationCreateNestedOneWithoutSalesInput;
    variant: Prisma.ProductVariantCreateNestedOneWithoutSalesInput;
};
export type SaleFromShopUncheckedCreateInput = {
    id?: string;
    locationId: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    location?: Prisma.ShopLocationUpdateOneRequiredWithoutSalesNestedInput;
    variant?: Prisma.ProductVariantUpdateOneRequiredWithoutSalesNestedInput;
};
export type SaleFromShopUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    locationId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopCreateManyInput = {
    id?: string;
    locationId: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    locationId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopListRelationFilter = {
    every?: Prisma.SaleFromShopWhereInput;
    some?: Prisma.SaleFromShopWhereInput;
    none?: Prisma.SaleFromShopWhereInput;
};
export type SaleFromShopOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SaleFromShopCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SaleFromShopAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type SaleFromShopMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SaleFromShopMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SaleFromShopSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type SaleFromShopCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput> | Prisma.SaleFromShopCreateWithoutLocationInput[] | Prisma.SaleFromShopUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutLocationInput | Prisma.SaleFromShopCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.SaleFromShopCreateManyLocationInputEnvelope;
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
};
export type SaleFromShopUncheckedCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput> | Prisma.SaleFromShopCreateWithoutLocationInput[] | Prisma.SaleFromShopUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutLocationInput | Prisma.SaleFromShopCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.SaleFromShopCreateManyLocationInputEnvelope;
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
};
export type SaleFromShopUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput> | Prisma.SaleFromShopCreateWithoutLocationInput[] | Prisma.SaleFromShopUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutLocationInput | Prisma.SaleFromShopCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.SaleFromShopUpsertWithWhereUniqueWithoutLocationInput | Prisma.SaleFromShopUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.SaleFromShopCreateManyLocationInputEnvelope;
    set?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    disconnect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    delete?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    update?: Prisma.SaleFromShopUpdateWithWhereUniqueWithoutLocationInput | Prisma.SaleFromShopUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.SaleFromShopUpdateManyWithWhereWithoutLocationInput | Prisma.SaleFromShopUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
};
export type SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput> | Prisma.SaleFromShopCreateWithoutLocationInput[] | Prisma.SaleFromShopUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutLocationInput | Prisma.SaleFromShopCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.SaleFromShopUpsertWithWhereUniqueWithoutLocationInput | Prisma.SaleFromShopUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.SaleFromShopCreateManyLocationInputEnvelope;
    set?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    disconnect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    delete?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    update?: Prisma.SaleFromShopUpdateWithWhereUniqueWithoutLocationInput | Prisma.SaleFromShopUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.SaleFromShopUpdateManyWithWhereWithoutLocationInput | Prisma.SaleFromShopUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
};
export type SaleFromShopCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput> | Prisma.SaleFromShopCreateWithoutVariantInput[] | Prisma.SaleFromShopUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutVariantInput | Prisma.SaleFromShopCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.SaleFromShopCreateManyVariantInputEnvelope;
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
};
export type SaleFromShopUncheckedCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput> | Prisma.SaleFromShopCreateWithoutVariantInput[] | Prisma.SaleFromShopUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutVariantInput | Prisma.SaleFromShopCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.SaleFromShopCreateManyVariantInputEnvelope;
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
};
export type SaleFromShopUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput> | Prisma.SaleFromShopCreateWithoutVariantInput[] | Prisma.SaleFromShopUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutVariantInput | Prisma.SaleFromShopCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.SaleFromShopUpsertWithWhereUniqueWithoutVariantInput | Prisma.SaleFromShopUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.SaleFromShopCreateManyVariantInputEnvelope;
    set?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    disconnect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    delete?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    update?: Prisma.SaleFromShopUpdateWithWhereUniqueWithoutVariantInput | Prisma.SaleFromShopUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.SaleFromShopUpdateManyWithWhereWithoutVariantInput | Prisma.SaleFromShopUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
};
export type SaleFromShopUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput> | Prisma.SaleFromShopCreateWithoutVariantInput[] | Prisma.SaleFromShopUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.SaleFromShopCreateOrConnectWithoutVariantInput | Prisma.SaleFromShopCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.SaleFromShopUpsertWithWhereUniqueWithoutVariantInput | Prisma.SaleFromShopUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.SaleFromShopCreateManyVariantInputEnvelope;
    set?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    disconnect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    delete?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    connect?: Prisma.SaleFromShopWhereUniqueInput | Prisma.SaleFromShopWhereUniqueInput[];
    update?: Prisma.SaleFromShopUpdateWithWhereUniqueWithoutVariantInput | Prisma.SaleFromShopUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.SaleFromShopUpdateManyWithWhereWithoutVariantInput | Prisma.SaleFromShopUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
};
export type SaleFromShopCreateWithoutLocationInput = {
    id?: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variant: Prisma.ProductVariantCreateNestedOneWithoutSalesInput;
};
export type SaleFromShopUncheckedCreateWithoutLocationInput = {
    id?: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopCreateOrConnectWithoutLocationInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput>;
};
export type SaleFromShopCreateManyLocationInputEnvelope = {
    data: Prisma.SaleFromShopCreateManyLocationInput | Prisma.SaleFromShopCreateManyLocationInput[];
    skipDuplicates?: boolean;
};
export type SaleFromShopUpsertWithWhereUniqueWithoutLocationInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleFromShopUpdateWithoutLocationInput, Prisma.SaleFromShopUncheckedUpdateWithoutLocationInput>;
    create: Prisma.XOR<Prisma.SaleFromShopCreateWithoutLocationInput, Prisma.SaleFromShopUncheckedCreateWithoutLocationInput>;
};
export type SaleFromShopUpdateWithWhereUniqueWithoutLocationInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleFromShopUpdateWithoutLocationInput, Prisma.SaleFromShopUncheckedUpdateWithoutLocationInput>;
};
export type SaleFromShopUpdateManyWithWhereWithoutLocationInput = {
    where: Prisma.SaleFromShopScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleFromShopUpdateManyMutationInput, Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationInput>;
};
export type SaleFromShopScalarWhereInput = {
    AND?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
    OR?: Prisma.SaleFromShopScalarWhereInput[];
    NOT?: Prisma.SaleFromShopScalarWhereInput | Prisma.SaleFromShopScalarWhereInput[];
    id?: Prisma.StringFilter<"SaleFromShop"> | string;
    locationId?: Prisma.StringFilter<"SaleFromShop"> | string;
    variantId?: Prisma.StringFilter<"SaleFromShop"> | string;
    quantity?: Prisma.IntFilter<"SaleFromShop"> | number;
    price?: Prisma.FloatFilter<"SaleFromShop"> | number;
    total?: Prisma.FloatFilter<"SaleFromShop"> | number;
    createdAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SaleFromShop"> | Date | string;
};
export type SaleFromShopCreateWithoutVariantInput = {
    id?: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    location: Prisma.ShopLocationCreateNestedOneWithoutSalesInput;
};
export type SaleFromShopUncheckedCreateWithoutVariantInput = {
    id?: string;
    locationId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopCreateOrConnectWithoutVariantInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    create: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput>;
};
export type SaleFromShopCreateManyVariantInputEnvelope = {
    data: Prisma.SaleFromShopCreateManyVariantInput | Prisma.SaleFromShopCreateManyVariantInput[];
    skipDuplicates?: boolean;
};
export type SaleFromShopUpsertWithWhereUniqueWithoutVariantInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    update: Prisma.XOR<Prisma.SaleFromShopUpdateWithoutVariantInput, Prisma.SaleFromShopUncheckedUpdateWithoutVariantInput>;
    create: Prisma.XOR<Prisma.SaleFromShopCreateWithoutVariantInput, Prisma.SaleFromShopUncheckedCreateWithoutVariantInput>;
};
export type SaleFromShopUpdateWithWhereUniqueWithoutVariantInput = {
    where: Prisma.SaleFromShopWhereUniqueInput;
    data: Prisma.XOR<Prisma.SaleFromShopUpdateWithoutVariantInput, Prisma.SaleFromShopUncheckedUpdateWithoutVariantInput>;
};
export type SaleFromShopUpdateManyWithWhereWithoutVariantInput = {
    where: Prisma.SaleFromShopScalarWhereInput;
    data: Prisma.XOR<Prisma.SaleFromShopUpdateManyMutationInput, Prisma.SaleFromShopUncheckedUpdateManyWithoutVariantInput>;
};
export type SaleFromShopCreateManyLocationInput = {
    id?: string;
    variantId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopUpdateWithoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    variant?: Prisma.ProductVariantUpdateOneRequiredWithoutSalesNestedInput;
};
export type SaleFromShopUncheckedUpdateWithoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopUncheckedUpdateManyWithoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopCreateManyVariantInput = {
    id?: string;
    locationId: string;
    quantity: number;
    price: number;
    total: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SaleFromShopUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    location?: Prisma.ShopLocationUpdateOneRequiredWithoutSalesNestedInput;
};
export type SaleFromShopUncheckedUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    locationId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopUncheckedUpdateManyWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    locationId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    total?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SaleFromShopSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    locationId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleFromShop"]>;
export type SaleFromShopSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    locationId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleFromShop"]>;
export type SaleFromShopSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    locationId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["saleFromShop"]>;
export type SaleFromShopSelectScalar = {
    id?: boolean;
    locationId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SaleFromShopOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "locationId" | "variantId" | "quantity" | "price" | "total" | "createdAt" | "updatedAt", ExtArgs["result"]["saleFromShop"]>;
export type SaleFromShopInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
};
export type SaleFromShopIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
};
export type SaleFromShopIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    location?: boolean | Prisma.ShopLocationDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.ProductVariantDefaultArgs<ExtArgs>;
};
export type $SaleFromShopPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SaleFromShop";
    objects: {
        location: Prisma.$ShopLocationPayload<ExtArgs>;
        variant: Prisma.$ProductVariantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        locationId: string;
        variantId: string;
        quantity: number;
        price: number;
        total: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["saleFromShop"]>;
    composites: {};
};
export type SaleFromShopGetPayload<S extends boolean | null | undefined | SaleFromShopDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload, S>;
export type SaleFromShopCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SaleFromShopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SaleFromShopCountAggregateInputType | true;
};
export interface SaleFromShopDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SaleFromShop'];
        meta: {
            name: 'SaleFromShop';
        };
    };
    /**
     * Find zero or one SaleFromShop that matches the filter.
     * @param {SaleFromShopFindUniqueArgs} args - Arguments to find a SaleFromShop
     * @example
     * // Get one SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFromShopFindUniqueArgs>(args: Prisma.SelectSubset<T, SaleFromShopFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SaleFromShop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFromShopFindUniqueOrThrowArgs} args - Arguments to find a SaleFromShop
     * @example
     * // Get one SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFromShopFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SaleFromShopFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SaleFromShop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopFindFirstArgs} args - Arguments to find a SaleFromShop
     * @example
     * // Get one SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFromShopFindFirstArgs>(args?: Prisma.SelectSubset<T, SaleFromShopFindFirstArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SaleFromShop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopFindFirstOrThrowArgs} args - Arguments to find a SaleFromShop
     * @example
     * // Get one SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFromShopFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SaleFromShopFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SaleFromShops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleFromShops
     * const saleFromShops = await prisma.saleFromShop.findMany()
     *
     * // Get first 10 SaleFromShops
     * const saleFromShops = await prisma.saleFromShop.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const saleFromShopWithIdOnly = await prisma.saleFromShop.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SaleFromShopFindManyArgs>(args?: Prisma.SelectSubset<T, SaleFromShopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SaleFromShop.
     * @param {SaleFromShopCreateArgs} args - Arguments to create a SaleFromShop.
     * @example
     * // Create one SaleFromShop
     * const SaleFromShop = await prisma.saleFromShop.create({
     *   data: {
     *     // ... data to create a SaleFromShop
     *   }
     * })
     *
     */
    create<T extends SaleFromShopCreateArgs>(args: Prisma.SelectSubset<T, SaleFromShopCreateArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SaleFromShops.
     * @param {SaleFromShopCreateManyArgs} args - Arguments to create many SaleFromShops.
     * @example
     * // Create many SaleFromShops
     * const saleFromShop = await prisma.saleFromShop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SaleFromShopCreateManyArgs>(args?: Prisma.SelectSubset<T, SaleFromShopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SaleFromShops and returns the data saved in the database.
     * @param {SaleFromShopCreateManyAndReturnArgs} args - Arguments to create many SaleFromShops.
     * @example
     * // Create many SaleFromShops
     * const saleFromShop = await prisma.saleFromShop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SaleFromShops and only return the `id`
     * const saleFromShopWithIdOnly = await prisma.saleFromShop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SaleFromShopCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SaleFromShopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SaleFromShop.
     * @param {SaleFromShopDeleteArgs} args - Arguments to delete one SaleFromShop.
     * @example
     * // Delete one SaleFromShop
     * const SaleFromShop = await prisma.saleFromShop.delete({
     *   where: {
     *     // ... filter to delete one SaleFromShop
     *   }
     * })
     *
     */
    delete<T extends SaleFromShopDeleteArgs>(args: Prisma.SelectSubset<T, SaleFromShopDeleteArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SaleFromShop.
     * @param {SaleFromShopUpdateArgs} args - Arguments to update one SaleFromShop.
     * @example
     * // Update one SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SaleFromShopUpdateArgs>(args: Prisma.SelectSubset<T, SaleFromShopUpdateArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SaleFromShops.
     * @param {SaleFromShopDeleteManyArgs} args - Arguments to filter SaleFromShops to delete.
     * @example
     * // Delete a few SaleFromShops
     * const { count } = await prisma.saleFromShop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SaleFromShopDeleteManyArgs>(args?: Prisma.SelectSubset<T, SaleFromShopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SaleFromShops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleFromShops
     * const saleFromShop = await prisma.saleFromShop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SaleFromShopUpdateManyArgs>(args: Prisma.SelectSubset<T, SaleFromShopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SaleFromShops and returns the data updated in the database.
     * @param {SaleFromShopUpdateManyAndReturnArgs} args - Arguments to update many SaleFromShops.
     * @example
     * // Update many SaleFromShops
     * const saleFromShop = await prisma.saleFromShop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SaleFromShops and only return the `id`
     * const saleFromShopWithIdOnly = await prisma.saleFromShop.updateManyAndReturn({
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
    updateManyAndReturn<T extends SaleFromShopUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SaleFromShopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SaleFromShop.
     * @param {SaleFromShopUpsertArgs} args - Arguments to update or create a SaleFromShop.
     * @example
     * // Update or create a SaleFromShop
     * const saleFromShop = await prisma.saleFromShop.upsert({
     *   create: {
     *     // ... data to create a SaleFromShop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleFromShop we want to update
     *   }
     * })
     */
    upsert<T extends SaleFromShopUpsertArgs>(args: Prisma.SelectSubset<T, SaleFromShopUpsertArgs<ExtArgs>>): Prisma.Prisma__SaleFromShopClient<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SaleFromShops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopCountArgs} args - Arguments to filter SaleFromShops to count.
     * @example
     * // Count the number of SaleFromShops
     * const count = await prisma.saleFromShop.count({
     *   where: {
     *     // ... the filter for the SaleFromShops we want to count
     *   }
     * })
    **/
    count<T extends SaleFromShopCountArgs>(args?: Prisma.Subset<T, SaleFromShopCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SaleFromShopCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SaleFromShop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SaleFromShopAggregateArgs>(args: Prisma.Subset<T, SaleFromShopAggregateArgs>): Prisma.PrismaPromise<GetSaleFromShopAggregateType<T>>;
    /**
     * Group by SaleFromShop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFromShopGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SaleFromShopGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SaleFromShopGroupByArgs['orderBy'];
    } : {
        orderBy?: SaleFromShopGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SaleFromShopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleFromShopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SaleFromShop model
     */
    readonly fields: SaleFromShopFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SaleFromShop.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SaleFromShopClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    location<T extends Prisma.ShopLocationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopLocationDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    variant<T extends Prisma.ProductVariantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductVariantDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the SaleFromShop model
 */
export interface SaleFromShopFieldRefs {
    readonly id: Prisma.FieldRef<"SaleFromShop", 'String'>;
    readonly locationId: Prisma.FieldRef<"SaleFromShop", 'String'>;
    readonly variantId: Prisma.FieldRef<"SaleFromShop", 'String'>;
    readonly quantity: Prisma.FieldRef<"SaleFromShop", 'Int'>;
    readonly price: Prisma.FieldRef<"SaleFromShop", 'Float'>;
    readonly total: Prisma.FieldRef<"SaleFromShop", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"SaleFromShop", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SaleFromShop", 'DateTime'>;
}
/**
 * SaleFromShop findUnique
 */
export type SaleFromShopFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter, which SaleFromShop to fetch.
     */
    where: Prisma.SaleFromShopWhereUniqueInput;
};
/**
 * SaleFromShop findUniqueOrThrow
 */
export type SaleFromShopFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter, which SaleFromShop to fetch.
     */
    where: Prisma.SaleFromShopWhereUniqueInput;
};
/**
 * SaleFromShop findFirst
 */
export type SaleFromShopFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter, which SaleFromShop to fetch.
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SaleFromShops to fetch.
     */
    orderBy?: Prisma.SaleFromShopOrderByWithRelationInput | Prisma.SaleFromShopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SaleFromShops.
     */
    cursor?: Prisma.SaleFromShopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SaleFromShops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SaleFromShops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SaleFromShops.
     */
    distinct?: Prisma.SaleFromShopScalarFieldEnum | Prisma.SaleFromShopScalarFieldEnum[];
};
/**
 * SaleFromShop findFirstOrThrow
 */
export type SaleFromShopFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter, which SaleFromShop to fetch.
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SaleFromShops to fetch.
     */
    orderBy?: Prisma.SaleFromShopOrderByWithRelationInput | Prisma.SaleFromShopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SaleFromShops.
     */
    cursor?: Prisma.SaleFromShopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SaleFromShops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SaleFromShops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SaleFromShops.
     */
    distinct?: Prisma.SaleFromShopScalarFieldEnum | Prisma.SaleFromShopScalarFieldEnum[];
};
/**
 * SaleFromShop findMany
 */
export type SaleFromShopFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter, which SaleFromShops to fetch.
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SaleFromShops to fetch.
     */
    orderBy?: Prisma.SaleFromShopOrderByWithRelationInput | Prisma.SaleFromShopOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SaleFromShops.
     */
    cursor?: Prisma.SaleFromShopWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SaleFromShops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SaleFromShops.
     */
    skip?: number;
    distinct?: Prisma.SaleFromShopScalarFieldEnum | Prisma.SaleFromShopScalarFieldEnum[];
};
/**
 * SaleFromShop create
 */
export type SaleFromShopCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * The data needed to create a SaleFromShop.
     */
    data: Prisma.XOR<Prisma.SaleFromShopCreateInput, Prisma.SaleFromShopUncheckedCreateInput>;
};
/**
 * SaleFromShop createMany
 */
export type SaleFromShopCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleFromShops.
     */
    data: Prisma.SaleFromShopCreateManyInput | Prisma.SaleFromShopCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SaleFromShop createManyAndReturn
 */
export type SaleFromShopCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * The data used to create many SaleFromShops.
     */
    data: Prisma.SaleFromShopCreateManyInput | Prisma.SaleFromShopCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SaleFromShop update
 */
export type SaleFromShopUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * The data needed to update a SaleFromShop.
     */
    data: Prisma.XOR<Prisma.SaleFromShopUpdateInput, Prisma.SaleFromShopUncheckedUpdateInput>;
    /**
     * Choose, which SaleFromShop to update.
     */
    where: Prisma.SaleFromShopWhereUniqueInput;
};
/**
 * SaleFromShop updateMany
 */
export type SaleFromShopUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleFromShops.
     */
    data: Prisma.XOR<Prisma.SaleFromShopUpdateManyMutationInput, Prisma.SaleFromShopUncheckedUpdateManyInput>;
    /**
     * Filter which SaleFromShops to update
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * Limit how many SaleFromShops to update.
     */
    limit?: number;
};
/**
 * SaleFromShop updateManyAndReturn
 */
export type SaleFromShopUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * The data used to update SaleFromShops.
     */
    data: Prisma.XOR<Prisma.SaleFromShopUpdateManyMutationInput, Prisma.SaleFromShopUncheckedUpdateManyInput>;
    /**
     * Filter which SaleFromShops to update
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * Limit how many SaleFromShops to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SaleFromShop upsert
 */
export type SaleFromShopUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * The filter to search for the SaleFromShop to update in case it exists.
     */
    where: Prisma.SaleFromShopWhereUniqueInput;
    /**
     * In case the SaleFromShop found by the `where` argument doesn't exist, create a new SaleFromShop with this data.
     */
    create: Prisma.XOR<Prisma.SaleFromShopCreateInput, Prisma.SaleFromShopUncheckedCreateInput>;
    /**
     * In case the SaleFromShop was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SaleFromShopUpdateInput, Prisma.SaleFromShopUncheckedUpdateInput>;
};
/**
 * SaleFromShop delete
 */
export type SaleFromShopDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
    /**
     * Filter which SaleFromShop to delete.
     */
    where: Prisma.SaleFromShopWhereUniqueInput;
};
/**
 * SaleFromShop deleteMany
 */
export type SaleFromShopDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SaleFromShops to delete
     */
    where?: Prisma.SaleFromShopWhereInput;
    /**
     * Limit how many SaleFromShops to delete.
     */
    limit?: number;
};
/**
 * SaleFromShop without action
 */
export type SaleFromShopDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleFromShop
     */
    select?: Prisma.SaleFromShopSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleFromShop
     */
    omit?: Prisma.SaleFromShopOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleFromShopInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=SaleFromShop.d.ts.map