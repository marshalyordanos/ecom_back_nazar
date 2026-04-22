import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ShopLocation
 *
 */
export type ShopLocationModel = runtime.Types.Result.DefaultSelection<Prisma.$ShopLocationPayload>;
export type AggregateShopLocation = {
    _count: ShopLocationCountAggregateOutputType | null;
    _avg: ShopLocationAvgAggregateOutputType | null;
    _sum: ShopLocationSumAggregateOutputType | null;
    _min: ShopLocationMinAggregateOutputType | null;
    _max: ShopLocationMaxAggregateOutputType | null;
};
export type ShopLocationAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
};
export type ShopLocationSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
};
export type ShopLocationMinAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    name: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    createdAt: Date | null;
};
export type ShopLocationMaxAggregateOutputType = {
    id: string | null;
    shopId: string | null;
    name: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    createdAt: Date | null;
};
export type ShopLocationCountAggregateOutputType = {
    id: number;
    shopId: number;
    name: number;
    addressLine1: number;
    addressLine2: number;
    city: number;
    state: number;
    country: number;
    postalCode: number;
    latitude: number;
    longitude: number;
    phone: number;
    createdAt: number;
    _all: number;
};
export type ShopLocationAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type ShopLocationSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type ShopLocationMinAggregateInputType = {
    id?: true;
    shopId?: true;
    name?: true;
    addressLine1?: true;
    addressLine2?: true;
    city?: true;
    state?: true;
    country?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    createdAt?: true;
};
export type ShopLocationMaxAggregateInputType = {
    id?: true;
    shopId?: true;
    name?: true;
    addressLine1?: true;
    addressLine2?: true;
    city?: true;
    state?: true;
    country?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    createdAt?: true;
};
export type ShopLocationCountAggregateInputType = {
    id?: true;
    shopId?: true;
    name?: true;
    addressLine1?: true;
    addressLine2?: true;
    city?: true;
    state?: true;
    country?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    createdAt?: true;
    _all?: true;
};
export type ShopLocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ShopLocation to aggregate.
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShopLocations to fetch.
     */
    orderBy?: Prisma.ShopLocationOrderByWithRelationInput | Prisma.ShopLocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ShopLocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShopLocations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShopLocations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ShopLocations
    **/
    _count?: true | ShopLocationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ShopLocationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ShopLocationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ShopLocationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ShopLocationMaxAggregateInputType;
};
export type GetShopLocationAggregateType<T extends ShopLocationAggregateArgs> = {
    [P in keyof T & keyof AggregateShopLocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShopLocation[P]> : Prisma.GetScalarType<T[P], AggregateShopLocation[P]>;
};
export type ShopLocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShopLocationWhereInput;
    orderBy?: Prisma.ShopLocationOrderByWithAggregationInput | Prisma.ShopLocationOrderByWithAggregationInput[];
    by: Prisma.ShopLocationScalarFieldEnum[] | Prisma.ShopLocationScalarFieldEnum;
    having?: Prisma.ShopLocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShopLocationCountAggregateInputType | true;
    _avg?: ShopLocationAvgAggregateInputType;
    _sum?: ShopLocationSumAggregateInputType;
    _min?: ShopLocationMinAggregateInputType;
    _max?: ShopLocationMaxAggregateInputType;
};
export type ShopLocationGroupByOutputType = {
    id: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    createdAt: Date;
    _count: ShopLocationCountAggregateOutputType | null;
    _avg: ShopLocationAvgAggregateOutputType | null;
    _sum: ShopLocationSumAggregateOutputType | null;
    _min: ShopLocationMinAggregateOutputType | null;
    _max: ShopLocationMaxAggregateOutputType | null;
};
export type GetShopLocationGroupByPayload<T extends ShopLocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShopLocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShopLocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShopLocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShopLocationGroupByOutputType[P]>;
}>>;
export type ShopLocationWhereInput = {
    AND?: Prisma.ShopLocationWhereInput | Prisma.ShopLocationWhereInput[];
    OR?: Prisma.ShopLocationWhereInput[];
    NOT?: Prisma.ShopLocationWhereInput | Prisma.ShopLocationWhereInput[];
    id?: Prisma.StringFilter<"ShopLocation"> | string;
    shopId?: Prisma.StringFilter<"ShopLocation"> | string;
    name?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine1?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine2?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    city?: Prisma.StringFilter<"ShopLocation"> | string;
    state?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    country?: Prisma.StringFilter<"ShopLocation"> | string;
    postalCode?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    phone?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShopLocation"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    inventories?: Prisma.InventoryListRelationFilter;
    sales?: Prisma.SaleFromShopListRelationFilter;
    movements?: Prisma.InventoryMovementListRelationFilter;
    users?: Prisma.UserListRelationFilter;
};
export type ShopLocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shop?: Prisma.ShopOrderByWithRelationInput;
    inventories?: Prisma.InventoryOrderByRelationAggregateInput;
    sales?: Prisma.SaleFromShopOrderByRelationAggregateInput;
    movements?: Prisma.InventoryMovementOrderByRelationAggregateInput;
    users?: Prisma.UserOrderByRelationAggregateInput;
};
export type ShopLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShopLocationWhereInput | Prisma.ShopLocationWhereInput[];
    OR?: Prisma.ShopLocationWhereInput[];
    NOT?: Prisma.ShopLocationWhereInput | Prisma.ShopLocationWhereInput[];
    shopId?: Prisma.StringFilter<"ShopLocation"> | string;
    name?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine1?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine2?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    city?: Prisma.StringFilter<"ShopLocation"> | string;
    state?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    country?: Prisma.StringFilter<"ShopLocation"> | string;
    postalCode?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    phone?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShopLocation"> | Date | string;
    shop?: Prisma.XOR<Prisma.ShopScalarRelationFilter, Prisma.ShopWhereInput>;
    inventories?: Prisma.InventoryListRelationFilter;
    sales?: Prisma.SaleFromShopListRelationFilter;
    movements?: Prisma.InventoryMovementListRelationFilter;
    users?: Prisma.UserListRelationFilter;
}, "id">;
export type ShopLocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShopLocationCountOrderByAggregateInput;
    _avg?: Prisma.ShopLocationAvgOrderByAggregateInput;
    _max?: Prisma.ShopLocationMaxOrderByAggregateInput;
    _min?: Prisma.ShopLocationMinOrderByAggregateInput;
    _sum?: Prisma.ShopLocationSumOrderByAggregateInput;
};
export type ShopLocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShopLocationScalarWhereWithAggregatesInput | Prisma.ShopLocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShopLocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShopLocationScalarWhereWithAggregatesInput | Prisma.ShopLocationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    shopId?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    addressLine1?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    addressLine2?: Prisma.StringNullableWithAggregatesFilter<"ShopLocation"> | string | null;
    city?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    state?: Prisma.StringNullableWithAggregatesFilter<"ShopLocation"> | string | null;
    country?: Prisma.StringWithAggregatesFilter<"ShopLocation"> | string;
    postalCode?: Prisma.StringNullableWithAggregatesFilter<"ShopLocation"> | string | null;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"ShopLocation"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"ShopLocation"> | number | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"ShopLocation"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShopLocation"> | Date | string;
};
export type ShopLocationCreateInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutLocationsInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopUncheckedCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementUncheckedCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutLocationsNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUncheckedUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationCreateManyInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
};
export type ShopLocationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShopLocationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShopLocationListRelationFilter = {
    every?: Prisma.ShopLocationWhereInput;
    some?: Prisma.ShopLocationWhereInput;
    none?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShopLocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShopLocationAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type ShopLocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShopLocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shopId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShopLocationSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type ShopLocationNullableScalarRelationFilter = {
    is?: Prisma.ShopLocationWhereInput | null;
    isNot?: Prisma.ShopLocationWhereInput | null;
};
export type ShopLocationScalarRelationFilter = {
    is?: Prisma.ShopLocationWhereInput;
    isNot?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput> | Prisma.ShopLocationCreateWithoutShopInput[] | Prisma.ShopLocationUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutShopInput | Prisma.ShopLocationCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.ShopLocationCreateManyShopInputEnvelope;
    connect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
};
export type ShopLocationUncheckedCreateNestedManyWithoutShopInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput> | Prisma.ShopLocationCreateWithoutShopInput[] | Prisma.ShopLocationUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutShopInput | Prisma.ShopLocationCreateOrConnectWithoutShopInput[];
    createMany?: Prisma.ShopLocationCreateManyShopInputEnvelope;
    connect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
};
export type ShopLocationUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput> | Prisma.ShopLocationCreateWithoutShopInput[] | Prisma.ShopLocationUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutShopInput | Prisma.ShopLocationCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.ShopLocationUpsertWithWhereUniqueWithoutShopInput | Prisma.ShopLocationUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.ShopLocationCreateManyShopInputEnvelope;
    set?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    disconnect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    delete?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    connect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    update?: Prisma.ShopLocationUpdateWithWhereUniqueWithoutShopInput | Prisma.ShopLocationUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.ShopLocationUpdateManyWithWhereWithoutShopInput | Prisma.ShopLocationUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.ShopLocationScalarWhereInput | Prisma.ShopLocationScalarWhereInput[];
};
export type ShopLocationUncheckedUpdateManyWithoutShopNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput> | Prisma.ShopLocationCreateWithoutShopInput[] | Prisma.ShopLocationUncheckedCreateWithoutShopInput[];
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutShopInput | Prisma.ShopLocationCreateOrConnectWithoutShopInput[];
    upsert?: Prisma.ShopLocationUpsertWithWhereUniqueWithoutShopInput | Prisma.ShopLocationUpsertWithWhereUniqueWithoutShopInput[];
    createMany?: Prisma.ShopLocationCreateManyShopInputEnvelope;
    set?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    disconnect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    delete?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    connect?: Prisma.ShopLocationWhereUniqueInput | Prisma.ShopLocationWhereUniqueInput[];
    update?: Prisma.ShopLocationUpdateWithWhereUniqueWithoutShopInput | Prisma.ShopLocationUpdateWithWhereUniqueWithoutShopInput[];
    updateMany?: Prisma.ShopLocationUpdateManyWithWhereWithoutShopInput | Prisma.ShopLocationUpdateManyWithWhereWithoutShopInput[];
    deleteMany?: Prisma.ShopLocationScalarWhereInput | Prisma.ShopLocationScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ShopLocationCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutUsersInput, Prisma.ShopLocationUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutUsersInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
};
export type ShopLocationUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutUsersInput, Prisma.ShopLocationUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.ShopLocationUpsertWithoutUsersInput;
    disconnect?: Prisma.ShopLocationWhereInput | boolean;
    delete?: Prisma.ShopLocationWhereInput | boolean;
    connect?: Prisma.ShopLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShopLocationUpdateToOneWithWhereWithoutUsersInput, Prisma.ShopLocationUpdateWithoutUsersInput>, Prisma.ShopLocationUncheckedUpdateWithoutUsersInput>;
};
export type ShopLocationCreateNestedOneWithoutInventoriesInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutInventoriesInput, Prisma.ShopLocationUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutInventoriesInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
};
export type ShopLocationUpdateOneRequiredWithoutInventoriesNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutInventoriesInput, Prisma.ShopLocationUncheckedCreateWithoutInventoriesInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutInventoriesInput;
    upsert?: Prisma.ShopLocationUpsertWithoutInventoriesInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShopLocationUpdateToOneWithWhereWithoutInventoriesInput, Prisma.ShopLocationUpdateWithoutInventoriesInput>, Prisma.ShopLocationUncheckedUpdateWithoutInventoriesInput>;
};
export type ShopLocationCreateNestedOneWithoutMovementsInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutMovementsInput, Prisma.ShopLocationUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutMovementsInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
};
export type ShopLocationUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutMovementsInput, Prisma.ShopLocationUncheckedCreateWithoutMovementsInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutMovementsInput;
    upsert?: Prisma.ShopLocationUpsertWithoutMovementsInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShopLocationUpdateToOneWithWhereWithoutMovementsInput, Prisma.ShopLocationUpdateWithoutMovementsInput>, Prisma.ShopLocationUncheckedUpdateWithoutMovementsInput>;
};
export type ShopLocationCreateNestedOneWithoutSalesInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutSalesInput, Prisma.ShopLocationUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutSalesInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
};
export type ShopLocationUpdateOneRequiredWithoutSalesNestedInput = {
    create?: Prisma.XOR<Prisma.ShopLocationCreateWithoutSalesInput, Prisma.ShopLocationUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.ShopLocationCreateOrConnectWithoutSalesInput;
    upsert?: Prisma.ShopLocationUpsertWithoutSalesInput;
    connect?: Prisma.ShopLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShopLocationUpdateToOneWithWhereWithoutSalesInput, Prisma.ShopLocationUpdateWithoutSalesInput>, Prisma.ShopLocationUncheckedUpdateWithoutSalesInput>;
};
export type ShopLocationCreateWithoutShopInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateWithoutShopInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopUncheckedCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementUncheckedCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationCreateOrConnectWithoutShopInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput>;
};
export type ShopLocationCreateManyShopInputEnvelope = {
    data: Prisma.ShopLocationCreateManyShopInput | Prisma.ShopLocationCreateManyShopInput[];
    skipDuplicates?: boolean;
};
export type ShopLocationUpsertWithWhereUniqueWithoutShopInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShopLocationUpdateWithoutShopInput, Prisma.ShopLocationUncheckedUpdateWithoutShopInput>;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutShopInput, Prisma.ShopLocationUncheckedCreateWithoutShopInput>;
};
export type ShopLocationUpdateWithWhereUniqueWithoutShopInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateWithoutShopInput, Prisma.ShopLocationUncheckedUpdateWithoutShopInput>;
};
export type ShopLocationUpdateManyWithWhereWithoutShopInput = {
    where: Prisma.ShopLocationScalarWhereInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateManyMutationInput, Prisma.ShopLocationUncheckedUpdateManyWithoutShopInput>;
};
export type ShopLocationScalarWhereInput = {
    AND?: Prisma.ShopLocationScalarWhereInput | Prisma.ShopLocationScalarWhereInput[];
    OR?: Prisma.ShopLocationScalarWhereInput[];
    NOT?: Prisma.ShopLocationScalarWhereInput | Prisma.ShopLocationScalarWhereInput[];
    id?: Prisma.StringFilter<"ShopLocation"> | string;
    shopId?: Prisma.StringFilter<"ShopLocation"> | string;
    name?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine1?: Prisma.StringFilter<"ShopLocation"> | string;
    addressLine2?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    city?: Prisma.StringFilter<"ShopLocation"> | string;
    state?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    country?: Prisma.StringFilter<"ShopLocation"> | string;
    postalCode?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"ShopLocation"> | number | null;
    phone?: Prisma.StringNullableFilter<"ShopLocation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShopLocation"> | Date | string;
};
export type ShopLocationCreateWithoutUsersInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutLocationsInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateWithoutUsersInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopUncheckedCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationCreateOrConnectWithoutUsersInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutUsersInput, Prisma.ShopLocationUncheckedCreateWithoutUsersInput>;
};
export type ShopLocationUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.ShopLocationUpdateWithoutUsersInput, Prisma.ShopLocationUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutUsersInput, Prisma.ShopLocationUncheckedCreateWithoutUsersInput>;
    where?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.ShopLocationWhereInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateWithoutUsersInput, Prisma.ShopLocationUncheckedUpdateWithoutUsersInput>;
};
export type ShopLocationUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutLocationsNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationCreateWithoutInventoriesInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutLocationsInput;
    sales?: Prisma.SaleFromShopCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateWithoutInventoriesInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    sales?: Prisma.SaleFromShopUncheckedCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementUncheckedCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationCreateOrConnectWithoutInventoriesInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutInventoriesInput, Prisma.ShopLocationUncheckedCreateWithoutInventoriesInput>;
};
export type ShopLocationUpsertWithoutInventoriesInput = {
    update: Prisma.XOR<Prisma.ShopLocationUpdateWithoutInventoriesInput, Prisma.ShopLocationUncheckedUpdateWithoutInventoriesInput>;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutInventoriesInput, Prisma.ShopLocationUncheckedCreateWithoutInventoriesInput>;
    where?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationUpdateToOneWithWhereWithoutInventoriesInput = {
    where?: Prisma.ShopLocationWhereInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateWithoutInventoriesInput, Prisma.ShopLocationUncheckedUpdateWithoutInventoriesInput>;
};
export type ShopLocationUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutLocationsNestedInput;
    sales?: Prisma.SaleFromShopUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateWithoutInventoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sales?: Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUncheckedUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationCreateWithoutMovementsInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutLocationsInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateWithoutMovementsInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutLocationInput;
    sales?: Prisma.SaleFromShopUncheckedCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationCreateOrConnectWithoutMovementsInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutMovementsInput, Prisma.ShopLocationUncheckedCreateWithoutMovementsInput>;
};
export type ShopLocationUpsertWithoutMovementsInput = {
    update: Prisma.XOR<Prisma.ShopLocationUpdateWithoutMovementsInput, Prisma.ShopLocationUncheckedUpdateWithoutMovementsInput>;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutMovementsInput, Prisma.ShopLocationUncheckedCreateWithoutMovementsInput>;
    where?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationUpdateToOneWithWhereWithoutMovementsInput = {
    where?: Prisma.ShopLocationWhereInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateWithoutMovementsInput, Prisma.ShopLocationUncheckedUpdateWithoutMovementsInput>;
};
export type ShopLocationUpdateWithoutMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutLocationsNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateWithoutMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationCreateWithoutSalesInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    shop: Prisma.ShopCreateNestedOneWithoutLocationsInput;
    inventories?: Prisma.InventoryCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserCreateNestedManyWithoutLocationInput;
};
export type ShopLocationUncheckedCreateWithoutSalesInput = {
    id?: string;
    shopId: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
    inventories?: Prisma.InventoryUncheckedCreateNestedManyWithoutLocationInput;
    movements?: Prisma.InventoryMovementUncheckedCreateNestedManyWithoutLocationInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLocationInput;
};
export type ShopLocationCreateOrConnectWithoutSalesInput = {
    where: Prisma.ShopLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutSalesInput, Prisma.ShopLocationUncheckedCreateWithoutSalesInput>;
};
export type ShopLocationUpsertWithoutSalesInput = {
    update: Prisma.XOR<Prisma.ShopLocationUpdateWithoutSalesInput, Prisma.ShopLocationUncheckedUpdateWithoutSalesInput>;
    create: Prisma.XOR<Prisma.ShopLocationCreateWithoutSalesInput, Prisma.ShopLocationUncheckedCreateWithoutSalesInput>;
    where?: Prisma.ShopLocationWhereInput;
};
export type ShopLocationUpdateToOneWithWhereWithoutSalesInput = {
    where?: Prisma.ShopLocationWhereInput;
    data: Prisma.XOR<Prisma.ShopLocationUpdateWithoutSalesInput, Prisma.ShopLocationUncheckedUpdateWithoutSalesInput>;
};
export type ShopLocationUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shop?: Prisma.ShopUpdateOneRequiredWithoutLocationsNestedInput;
    inventories?: Prisma.InventoryUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shopId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUncheckedUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationCreateManyShopInput = {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    country: string;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    createdAt?: Date | string;
};
export type ShopLocationUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inventories?: Prisma.InventoryUncheckedUpdateManyWithoutLocationNestedInput;
    sales?: Prisma.SaleFromShopUncheckedUpdateManyWithoutLocationNestedInput;
    movements?: Prisma.InventoryMovementUncheckedUpdateManyWithoutLocationNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLocationNestedInput;
};
export type ShopLocationUncheckedUpdateManyWithoutShopInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ShopLocationCountOutputType
 */
export type ShopLocationCountOutputType = {
    inventories: number;
    sales: number;
    movements: number;
    users: number;
};
export type ShopLocationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inventories?: boolean | ShopLocationCountOutputTypeCountInventoriesArgs;
    sales?: boolean | ShopLocationCountOutputTypeCountSalesArgs;
    movements?: boolean | ShopLocationCountOutputTypeCountMovementsArgs;
    users?: boolean | ShopLocationCountOutputTypeCountUsersArgs;
};
/**
 * ShopLocationCountOutputType without action
 */
export type ShopLocationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocationCountOutputType
     */
    select?: Prisma.ShopLocationCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ShopLocationCountOutputType without action
 */
export type ShopLocationCountOutputTypeCountInventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryWhereInput;
};
/**
 * ShopLocationCountOutputType without action
 */
export type ShopLocationCountOutputTypeCountSalesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleFromShopWhereInput;
};
/**
 * ShopLocationCountOutputType without action
 */
export type ShopLocationCountOutputTypeCountMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryMovementWhereInput;
};
/**
 * ShopLocationCountOutputType without action
 */
export type ShopLocationCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type ShopLocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    name?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    country?: boolean;
    postalCode?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    inventories?: boolean | Prisma.ShopLocation$inventoriesArgs<ExtArgs>;
    sales?: boolean | Prisma.ShopLocation$salesArgs<ExtArgs>;
    movements?: boolean | Prisma.ShopLocation$movementsArgs<ExtArgs>;
    users?: boolean | Prisma.ShopLocation$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.ShopLocationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shopLocation"]>;
export type ShopLocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    name?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    country?: boolean;
    postalCode?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shopLocation"]>;
export type ShopLocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shopId?: boolean;
    name?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    country?: boolean;
    postalCode?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shopLocation"]>;
export type ShopLocationSelectScalar = {
    id?: boolean;
    shopId?: boolean;
    name?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    country?: boolean;
    postalCode?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    createdAt?: boolean;
};
export type ShopLocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shopId" | "name" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "postalCode" | "latitude" | "longitude" | "phone" | "createdAt", ExtArgs["result"]["shopLocation"]>;
export type ShopLocationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
    inventories?: boolean | Prisma.ShopLocation$inventoriesArgs<ExtArgs>;
    sales?: boolean | Prisma.ShopLocation$salesArgs<ExtArgs>;
    movements?: boolean | Prisma.ShopLocation$movementsArgs<ExtArgs>;
    users?: boolean | Prisma.ShopLocation$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.ShopLocationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ShopLocationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type ShopLocationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shop?: boolean | Prisma.ShopDefaultArgs<ExtArgs>;
};
export type $ShopLocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShopLocation";
    objects: {
        shop: Prisma.$ShopPayload<ExtArgs>;
        inventories: Prisma.$InventoryPayload<ExtArgs>[];
        sales: Prisma.$SaleFromShopPayload<ExtArgs>[];
        movements: Prisma.$InventoryMovementPayload<ExtArgs>[];
        users: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shopId: string;
        name: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
        phone: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["shopLocation"]>;
    composites: {};
};
export type ShopLocationGetPayload<S extends boolean | null | undefined | ShopLocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload, S>;
export type ShopLocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShopLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShopLocationCountAggregateInputType | true;
};
export interface ShopLocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShopLocation'];
        meta: {
            name: 'ShopLocation';
        };
    };
    /**
     * Find zero or one ShopLocation that matches the filter.
     * @param {ShopLocationFindUniqueArgs} args - Arguments to find a ShopLocation
     * @example
     * // Get one ShopLocation
     * const shopLocation = await prisma.shopLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopLocationFindUniqueArgs>(args: Prisma.SelectSubset<T, ShopLocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ShopLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopLocationFindUniqueOrThrowArgs} args - Arguments to find a ShopLocation
     * @example
     * // Get one ShopLocation
     * const shopLocation = await prisma.shopLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopLocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShopLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ShopLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationFindFirstArgs} args - Arguments to find a ShopLocation
     * @example
     * // Get one ShopLocation
     * const shopLocation = await prisma.shopLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopLocationFindFirstArgs>(args?: Prisma.SelectSubset<T, ShopLocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ShopLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationFindFirstOrThrowArgs} args - Arguments to find a ShopLocation
     * @example
     * // Get one ShopLocation
     * const shopLocation = await prisma.shopLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopLocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShopLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ShopLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopLocations
     * const shopLocations = await prisma.shopLocation.findMany()
     *
     * // Get first 10 ShopLocations
     * const shopLocations = await prisma.shopLocation.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const shopLocationWithIdOnly = await prisma.shopLocation.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ShopLocationFindManyArgs>(args?: Prisma.SelectSubset<T, ShopLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ShopLocation.
     * @param {ShopLocationCreateArgs} args - Arguments to create a ShopLocation.
     * @example
     * // Create one ShopLocation
     * const ShopLocation = await prisma.shopLocation.create({
     *   data: {
     *     // ... data to create a ShopLocation
     *   }
     * })
     *
     */
    create<T extends ShopLocationCreateArgs>(args: Prisma.SelectSubset<T, ShopLocationCreateArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ShopLocations.
     * @param {ShopLocationCreateManyArgs} args - Arguments to create many ShopLocations.
     * @example
     * // Create many ShopLocations
     * const shopLocation = await prisma.shopLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ShopLocationCreateManyArgs>(args?: Prisma.SelectSubset<T, ShopLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ShopLocations and returns the data saved in the database.
     * @param {ShopLocationCreateManyAndReturnArgs} args - Arguments to create many ShopLocations.
     * @example
     * // Create many ShopLocations
     * const shopLocation = await prisma.shopLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ShopLocations and only return the `id`
     * const shopLocationWithIdOnly = await prisma.shopLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ShopLocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShopLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ShopLocation.
     * @param {ShopLocationDeleteArgs} args - Arguments to delete one ShopLocation.
     * @example
     * // Delete one ShopLocation
     * const ShopLocation = await prisma.shopLocation.delete({
     *   where: {
     *     // ... filter to delete one ShopLocation
     *   }
     * })
     *
     */
    delete<T extends ShopLocationDeleteArgs>(args: Prisma.SelectSubset<T, ShopLocationDeleteArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ShopLocation.
     * @param {ShopLocationUpdateArgs} args - Arguments to update one ShopLocation.
     * @example
     * // Update one ShopLocation
     * const shopLocation = await prisma.shopLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ShopLocationUpdateArgs>(args: Prisma.SelectSubset<T, ShopLocationUpdateArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ShopLocations.
     * @param {ShopLocationDeleteManyArgs} args - Arguments to filter ShopLocations to delete.
     * @example
     * // Delete a few ShopLocations
     * const { count } = await prisma.shopLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ShopLocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShopLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ShopLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopLocations
     * const shopLocation = await prisma.shopLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ShopLocationUpdateManyArgs>(args: Prisma.SelectSubset<T, ShopLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ShopLocations and returns the data updated in the database.
     * @param {ShopLocationUpdateManyAndReturnArgs} args - Arguments to update many ShopLocations.
     * @example
     * // Update many ShopLocations
     * const shopLocation = await prisma.shopLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ShopLocations and only return the `id`
     * const shopLocationWithIdOnly = await prisma.shopLocation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShopLocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShopLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ShopLocation.
     * @param {ShopLocationUpsertArgs} args - Arguments to update or create a ShopLocation.
     * @example
     * // Update or create a ShopLocation
     * const shopLocation = await prisma.shopLocation.upsert({
     *   create: {
     *     // ... data to create a ShopLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopLocation we want to update
     *   }
     * })
     */
    upsert<T extends ShopLocationUpsertArgs>(args: Prisma.SelectSubset<T, ShopLocationUpsertArgs<ExtArgs>>): Prisma.Prisma__ShopLocationClient<runtime.Types.Result.GetResult<Prisma.$ShopLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ShopLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationCountArgs} args - Arguments to filter ShopLocations to count.
     * @example
     * // Count the number of ShopLocations
     * const count = await prisma.shopLocation.count({
     *   where: {
     *     // ... the filter for the ShopLocations we want to count
     *   }
     * })
    **/
    count<T extends ShopLocationCountArgs>(args?: Prisma.Subset<T, ShopLocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShopLocationCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ShopLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShopLocationAggregateArgs>(args: Prisma.Subset<T, ShopLocationAggregateArgs>): Prisma.PrismaPromise<GetShopLocationAggregateType<T>>;
    /**
     * Group by ShopLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopLocationGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ShopLocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShopLocationGroupByArgs['orderBy'];
    } : {
        orderBy?: ShopLocationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShopLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ShopLocation model
     */
    readonly fields: ShopLocationFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ShopLocation.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ShopLocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shop<T extends Prisma.ShopDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopDefaultArgs<ExtArgs>>): Prisma.Prisma__ShopClient<runtime.Types.Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inventories<T extends Prisma.ShopLocation$inventoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopLocation$inventoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sales<T extends Prisma.ShopLocation$salesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopLocation$salesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleFromShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    movements<T extends Prisma.ShopLocation$movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopLocation$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.ShopLocation$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShopLocation$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ShopLocation model
 */
export interface ShopLocationFieldRefs {
    readonly id: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly shopId: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly name: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly addressLine1: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly addressLine2: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly city: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly state: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly country: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly postalCode: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly latitude: Prisma.FieldRef<"ShopLocation", 'Float'>;
    readonly longitude: Prisma.FieldRef<"ShopLocation", 'Float'>;
    readonly phone: Prisma.FieldRef<"ShopLocation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ShopLocation", 'DateTime'>;
}
/**
 * ShopLocation findUnique
 */
export type ShopLocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter, which ShopLocation to fetch.
     */
    where: Prisma.ShopLocationWhereUniqueInput;
};
/**
 * ShopLocation findUniqueOrThrow
 */
export type ShopLocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter, which ShopLocation to fetch.
     */
    where: Prisma.ShopLocationWhereUniqueInput;
};
/**
 * ShopLocation findFirst
 */
export type ShopLocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter, which ShopLocation to fetch.
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShopLocations to fetch.
     */
    orderBy?: Prisma.ShopLocationOrderByWithRelationInput | Prisma.ShopLocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ShopLocations.
     */
    cursor?: Prisma.ShopLocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShopLocations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShopLocations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShopLocations.
     */
    distinct?: Prisma.ShopLocationScalarFieldEnum | Prisma.ShopLocationScalarFieldEnum[];
};
/**
 * ShopLocation findFirstOrThrow
 */
export type ShopLocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter, which ShopLocation to fetch.
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShopLocations to fetch.
     */
    orderBy?: Prisma.ShopLocationOrderByWithRelationInput | Prisma.ShopLocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ShopLocations.
     */
    cursor?: Prisma.ShopLocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShopLocations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShopLocations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShopLocations.
     */
    distinct?: Prisma.ShopLocationScalarFieldEnum | Prisma.ShopLocationScalarFieldEnum[];
};
/**
 * ShopLocation findMany
 */
export type ShopLocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter, which ShopLocations to fetch.
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShopLocations to fetch.
     */
    orderBy?: Prisma.ShopLocationOrderByWithRelationInput | Prisma.ShopLocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ShopLocations.
     */
    cursor?: Prisma.ShopLocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShopLocations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShopLocations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShopLocations.
     */
    distinct?: Prisma.ShopLocationScalarFieldEnum | Prisma.ShopLocationScalarFieldEnum[];
};
/**
 * ShopLocation create
 */
export type ShopLocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * The data needed to create a ShopLocation.
     */
    data: Prisma.XOR<Prisma.ShopLocationCreateInput, Prisma.ShopLocationUncheckedCreateInput>;
};
/**
 * ShopLocation createMany
 */
export type ShopLocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopLocations.
     */
    data: Prisma.ShopLocationCreateManyInput | Prisma.ShopLocationCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ShopLocation createManyAndReturn
 */
export type ShopLocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * The data used to create many ShopLocations.
     */
    data: Prisma.ShopLocationCreateManyInput | Prisma.ShopLocationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ShopLocation update
 */
export type ShopLocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * The data needed to update a ShopLocation.
     */
    data: Prisma.XOR<Prisma.ShopLocationUpdateInput, Prisma.ShopLocationUncheckedUpdateInput>;
    /**
     * Choose, which ShopLocation to update.
     */
    where: Prisma.ShopLocationWhereUniqueInput;
};
/**
 * ShopLocation updateMany
 */
export type ShopLocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopLocations.
     */
    data: Prisma.XOR<Prisma.ShopLocationUpdateManyMutationInput, Prisma.ShopLocationUncheckedUpdateManyInput>;
    /**
     * Filter which ShopLocations to update
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * Limit how many ShopLocations to update.
     */
    limit?: number;
};
/**
 * ShopLocation updateManyAndReturn
 */
export type ShopLocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * The data used to update ShopLocations.
     */
    data: Prisma.XOR<Prisma.ShopLocationUpdateManyMutationInput, Prisma.ShopLocationUncheckedUpdateManyInput>;
    /**
     * Filter which ShopLocations to update
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * Limit how many ShopLocations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ShopLocation upsert
 */
export type ShopLocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * The filter to search for the ShopLocation to update in case it exists.
     */
    where: Prisma.ShopLocationWhereUniqueInput;
    /**
     * In case the ShopLocation found by the `where` argument doesn't exist, create a new ShopLocation with this data.
     */
    create: Prisma.XOR<Prisma.ShopLocationCreateInput, Prisma.ShopLocationUncheckedCreateInput>;
    /**
     * In case the ShopLocation was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ShopLocationUpdateInput, Prisma.ShopLocationUncheckedUpdateInput>;
};
/**
 * ShopLocation delete
 */
export type ShopLocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
    /**
     * Filter which ShopLocation to delete.
     */
    where: Prisma.ShopLocationWhereUniqueInput;
};
/**
 * ShopLocation deleteMany
 */
export type ShopLocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ShopLocations to delete
     */
    where?: Prisma.ShopLocationWhereInput;
    /**
     * Limit how many ShopLocations to delete.
     */
    limit?: number;
};
/**
 * ShopLocation.inventories
 */
export type ShopLocation$inventoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: Prisma.InventorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inventory
     */
    omit?: Prisma.InventoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryInclude<ExtArgs> | null;
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput | Prisma.InventoryOrderByWithRelationInput[];
    cursor?: Prisma.InventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryScalarFieldEnum | Prisma.InventoryScalarFieldEnum[];
};
/**
 * ShopLocation.sales
 */
export type ShopLocation$salesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.SaleFromShopWhereInput;
    orderBy?: Prisma.SaleFromShopOrderByWithRelationInput | Prisma.SaleFromShopOrderByWithRelationInput[];
    cursor?: Prisma.SaleFromShopWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleFromShopScalarFieldEnum | Prisma.SaleFromShopScalarFieldEnum[];
};
/**
 * ShopLocation.movements
 */
export type ShopLocation$movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryMovement
     */
    select?: Prisma.InventoryMovementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryMovement
     */
    omit?: Prisma.InventoryMovementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryMovementInclude<ExtArgs> | null;
    where?: Prisma.InventoryMovementWhereInput;
    orderBy?: Prisma.InventoryMovementOrderByWithRelationInput | Prisma.InventoryMovementOrderByWithRelationInput[];
    cursor?: Prisma.InventoryMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryMovementScalarFieldEnum | Prisma.InventoryMovementScalarFieldEnum[];
};
/**
 * ShopLocation.users
 */
export type ShopLocation$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * ShopLocation without action
 */
export type ShopLocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopLocation
     */
    select?: Prisma.ShopLocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShopLocation
     */
    omit?: Prisma.ShopLocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShopLocationInclude<ExtArgs> | null;
};
//# sourceMappingURL=ShopLocation.d.ts.map