import React, { useEffect, useState } from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';

import { getProductInfoFromApi } from '../api/request'

export default ({ navigation, route }) => {
    let [product, setProduct] = useState({});

    useEffect(async _ => {
        let response = await getProductInfoFromApi(route.params.code);
        setProduct(response);
        console.warn(response);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Text>
                EAN - CODIGO DE BARRAS {product.code}
            </Text>
            {product.product && <Item product={product.product} />
            }

        </View>
    )
}

const Item = React.memo(({ product }) => {
    return (
        <ScrollView style={styles.scrollviewContainer}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.imageProduct}
                    source={product.image_url ? { uri: product.image_url } : null}
                />
                <View style={styles.headerDescription}>
                    <Text
                        style={styles.productNameText}>{product.product_name ? product.product_name : "Nome não emcontrado"}</Text>
                    <Text style={styles.defaultText}>Quantidade
                    : {product.quantity ? product.quantity : "Non renseignée"}</Text>
                    <Text style={styles.defaultText}>Marque
                    : {product.brands ? product.brands.split(",").map(m => m.trim()).join(", ") : "Non renseignée"}</Text>
                    <Text style={styles.descriptionText}>Código de barras : {product._id}</Text>
                </View>
            </View>

            <Text style={styles.titleText}>Categorias</Text>

            <Text
                style={styles.defaultText}>{product.categories ? product.categories : "Sem categoria"}
            </Text>

            <Text style={styles.titleText}>Ingredientes</Text>

            <Ingredites ingredientsWithAllergens={product.ingredients} />

            <ParseAllergens allergens={product.allergens} />
            {/* 
            {ProductScreen._parseIngredientWithAllergens(product.ingredients)}

            {ProductScreen._parseAllergens(product.allergens)} */}

            <Image
                style={styles.imageNutri}
                source={{ uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + product.nutrition_grades + '.png' }}
            />

            {/* {this._printBasketOptions()} */}

        </ScrollView>
    )
})


/**
 * Input: string of ingredients with allergens
 * Output: JSX corresponding to the <Text> with allergens in bold
 */
const Ingredites = React.memo(({ ingredientsWithAllergens }) => {
    if (!ingredientsWithAllergens) {
        return (<Text style={styles.defaultText}>Non renseigné</Text>)
    } else {
        const splitedIngredients = ingredientsWithAllergens.split(/<span class=\"allergen\">|<\/span>/);

        return (
            <Text style={styles.defaultText}>
                {splitedIngredients.map((value, index) => {
                    if (index % 2 === 1) {
                        return (
                            <Text style={{ fontWeight: 'bold' }} key={index}>{value}</Text>
                        )
                    } else {
                        return (
                            <Text key={index}>{value}</Text>
                        )
                    }
                })}
            </Text>
        )
    }
})

/**
 * Generate JSX for allergens
 */
const ParseAllergens = React.memo(({ allergens }) => {
    if (!allergens) {
        return (<View></View>);
    } else {
        return (
            <View>
                <Text style={styles.titleText}>Allergènes</Text>
                <Text style={styles.defaultText}>{allergens}</Text>
            </View>
        )
    }
})

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    scrollviewContainer: {
        flex: 1,
        flexDirection: "column"
    },
    headerContainer: {
        flexDirection: "row",
    },
    imageProduct: {
        flex: 1,
        margin: 5,
        resizeMode: 'contain',
    },
    imageNutri: {
        height: 80,
        marginTop: 5,
        marginBottom: 10,
        resizeMode: "contain",
    },
    headerDescription: {
        flex: 1,
    },
    productNameText: {
        fontWeight: 'bold',
        fontSize: 30,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'left'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        color: '#000000',
        textAlign: 'left'
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    defaultText: {
        marginLeft: 5,
        marginRight: 5,
    },
    cartButton: {
        marginLeft: 15,
        marginRight: 15,
    },
    borderTop: {
        borderTopColor: '#d8d8d8',
        borderTopWidth: 1,
    },
});