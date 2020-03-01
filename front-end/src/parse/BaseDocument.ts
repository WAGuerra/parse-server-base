import * as Parse from "parse";

export interface BaseModelInterface {
  [ index: string ]: any;

  id?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export abstract class BaseDocument extends Parse.Object implements BaseModelInterface {
    [ index: string ]: any;

    static keyCreatedAtName = "createdAt";
    static keyObjectIdName = "id";
    static keyUpdatedAtName = "updatedAt";

    abstract get documentName(): string;

    get createdAt(): Date {
        return this.get( BaseDocument.keyCreatedAtName );
    }

    set createdAt( value: Date ) {
        this.set( BaseDocument.keyCreatedAtName, value );
    }

    get id(): string {
        return this.get( BaseDocument.keyObjectIdName );
    }

    set id( value: string ) {
        this.set( BaseDocument.keyObjectIdName, value );
    }

    get updatedAt(): Date {
        return this.get( BaseDocument.keyUpdatedAtName );
    }

    set updatedAt( value: Date ) {
        this.set( BaseDocument.keyCreatedAtName, value );
    }


}
