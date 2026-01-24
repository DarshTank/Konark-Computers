import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, query, where, orderBy, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Setting, Brand, Product, Lead, Service, Inquiry } from "@/types";

export const getSettings = async (): Promise<Record<string, string>> => {
    try {
        const settingsRef = collection(db, "settings");
        const snapshot = await getDocs(settingsRef);
        const settings: Record<string, string> = {};
        
        snapshot.forEach((doc) => {
            const data = doc.data() as Setting;
            settings[data.key] = data.value;
        });
        
        return settings;
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
};

export const getBrands = async (): Promise<Brand[]> => {
    try {
        const brandsRef = collection(db, "brands");
        // Removing orderBy to avoid index creation requirement for now
        const q = query(brandsRef, where("is_active", "==", true));
        const snapshot = await getDocs(q);
        
        const brands = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Brand));

        // Sort in memory
        return brands.sort((a, b) => a.display_order - b.display_order);
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
};


export const getProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("in_stock", "==", true));
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getTechLabProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, "products");
        // Filter for specific "Tech Lab" categories
        const techCategories = ['cpu', 'motherboard', 'ram', 'gpu', 'cooling', 'case'];
        const q = query(
            productsRef, 
            where("in_stock", "==", true),
            where("category", "in", techCategories)
        );
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
    } catch (error) {
        console.error("Error fetching tech lab products:", error);
        return [];
    }
};

export const createLead = async (leadData: Partial<Lead>): Promise<{ success: boolean; error?: any }> => {
    try {
        const leadsRef = collection(db, "leads");
        await addDoc(leadsRef, {
            ...leadData,
            created_at: new Date().toISOString(),
            status: 'new'
        });
        return { success: true };
    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error };
    }
};

export const addLead = async (lead: Omit<Lead, 'id'>): Promise<Lead | null> => {
    try {
        const docRef = await addDoc(collection(db, "leads"), lead);
        return { id: docRef.id, ...lead } as Lead;
    } catch (error) {
        console.error("Error adding lead:", error);
        return null;
    }
};

export const getLeads = async (): Promise<Lead[]> => {
    try {
        const leadsRef = collection(db, "leads");
        const q = query(leadsRef, orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Lead));
    } catch (error) {
        console.error("Error fetching leads:", error);
        return [];
    }
};

export const updateLeadStatus = async (id: string, status: string): Promise<boolean> => {
    try {
        const leadRef = doc(db, "leads", id);
        await updateDoc(leadRef, { 
            status, 
            updated_at: new Date().toISOString() 
        });
        return true;
    } catch (error) {
        console.error("Error updating lead:", error);
        return false;
    }
};

export const getServices = async (): Promise<Service[]> => {
    try {
        const servicesRef = collection(db, "services");
        const q = query(servicesRef, orderBy("name"));
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Service));
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, "products", id));
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};

export const deleteService = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, "services", id));
        return true;
    } catch (error) {
        console.error("Error deleting service:", error);
        return false;
    }
};

export const deleteBrand = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, "brands", id));
        return true;
    } catch (error) {
        console.error("Error deleting brand:", error);
        return false;
    }
};

export const updateSetting = async (key: string, value: string): Promise<boolean> => {
    try {
        const settingsRef = collection(db, "settings");
        const q = query(settingsRef, where("key", "==", key));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            // Update existing
            const docId = snapshot.docs[0].id;
            await updateDoc(doc(db, "settings", docId), {
                value,
                updated_at: new Date().toISOString()
            });
        } else {
            // Create new
            await addDoc(settingsRef, {
                key,
                value,
                description: null,
                updated_at: new Date().toISOString()
            });
        }
        return true;
    } catch (error) {
        console.error("Error updating setting:", error);
        return false;
    }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        return { id: docRef.id, ...product } as Product;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "products", id), product);
        return true;
    } catch (error) {
        console.error("Error updating product:", error);
        return false;
    }
};

export const addService = async (service: Omit<Service, 'id'>): Promise<Service | null> => {
    try {
        const docRef = await addDoc(collection(db, "services"), service);
        return { id: docRef.id, ...service } as Service;
    } catch (error) {
        console.error("Error adding service:", error);
        return null;
    }
};

export const updateService = async (id: string, service: Partial<Service>): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "services", id), service);
        return true;
    } catch (error) {
        console.error("Error updating service:", error);
        return false;
    }
};

export const addBrand = async (brand: Omit<Brand, 'id'>): Promise<Brand | null> => {
    try {
        const docRef = await addDoc(collection(db, "brands"), brand);
        return { id: docRef.id, ...brand } as Brand;
    } catch (error) {
        console.error("Error adding brand:", error);
        return null;
    }
};

export const updateBrand = async (id: string, brand: Partial<Brand>): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "brands", id), brand);
        return true;
    } catch (error) {
        console.error("Error updating brand:", error);
        return false;
    }
};

export const addInquiry = async (inquiry: Omit<Inquiry, 'id'>): Promise<Inquiry | null> => {
    try {
        const docRef = await addDoc(collection(db, "inquiries"), inquiry);
        return { id: docRef.id, ...inquiry };
    } catch (error) {
        console.error("Error adding inquiry:", error);
        throw error;
    }
};

export const getInquiries = async (): Promise<Inquiry[]> => {
    try {
        const q = query(collection(db, "inquiries"), orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return [];
    }
};

export const updateInquiryStatus = async (id: string, status: Inquiry['status']): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "inquiries", id), { status });
        return true;
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        return false;
    }
};


